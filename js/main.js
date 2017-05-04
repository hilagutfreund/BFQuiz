var bfApp = angular.module('bfApp', ['ngRoute', 'ui.router', 'ngSanitize']);

    bfApp.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('bf');
        $stateProvider
        .state('bf', {
            url: '/bf',
            templateUrl: 'templates/main.html',
            controller: 'mainController'
        })

        .state('about', {
            url: '/about', 
            templateUrl: "templates/about.html", 
            controller: 'aboutController'

        })

    });

    
    bfApp.controller('mainController', function($scope, $rootScope) {
        // $scope.renderHtml = function(html_code)
        // {
        //     return $sce.trustAsHtml(html_code);
        // };
        $scope.quizit = "";
        /**
        * Randomize array element order in-place.
        * Using Durstenfeld shuffle algorithm.
        */
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }

        $scope.$on('answersready', function(events, args){
        $scope.answersready = true; 
        $scope.answers= args;  
        $scope.$root.$digest();
        });

        $scope.$on('titleready', function(events, args){
        $scope.answersready = true; 
        $scope.titleOfArticle= args;
        $scope.$root.$digest();
        });


$scope.origresultList = []; 
$scope.actualResultsList = [];
$scope.badges = ['../img/badges/basic-badge.png', '../img/badges/blessed-badge.png', '../img/badges/kthxbai-badge.png','../img/badges/meh-badge.png', '../img/badges/orly-badge.png', '../img/badges/bf-badge.png', '../img/badges/lol-badge.png', '../img/badges/cute-badge.png',  '../img/badges/omg-badge.png', '../img/badges/win-badge.png', '../img/badges/wtf-badge.png'];
$scope.shuffledBadges = shuffleArray($scope.badges); 

$scope.searchUrl = function(url){
    $scope.origresultList = []; 
    $scope.actualResultsList = [];
    console.log(url);
    jQuery(function($){
    console.log("we're here!");
    //var url = "https://www.buzzfeed.com/spreetsg/pick-gear-from-serengetee-and-well-tell-you-the-n-ge2c?utm_term=.pkwL4g5q7#.uq1LdM809";
    $.ajaxPrefilter( function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
            options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    //options.url = "http://cors.corsproxy.io/url=" + options.url;
        }
    });

    $.get(
        url,
        function (response) {
            //console.log(response);
            var html = $.parseHTML(response); 
            
            
            //find answers
            $scope.origresultsList = ($(html).find('article'));
            for(i=0; i<$scope.origresultsList.length; i++){
                var result = $scope.origresultsList[i];
                if(($(result).attr('class')) == 'subbuzz-quiz__result js-subbuzz-quiz__result xs-mb3 js-hidden'){
                    $("figure", result).remove().end()[0];
                
                    $scope.actualResultsList.push({html:result, image: $scope.shuffledBadges[i%($scope.shuffledBadges.length)]}); 
                }
            }
            //find title and subtitle
            $scope.headerList = ($(html).find('hgroup'));
            $("div", $scope.headerList[0]).remove().end()[0];

            //broadcast
            $rootScope.$broadcast('titleready', $scope.headerList[0]);
            $rootScope.$broadcast('answersready', $scope.actualResultsList);


    });
});
}


    
});


