var bfApp = angular.module('bfApp', ['ngRoute', 'ui.router']);

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
        $scope.imagesReady = false; 
        $scope.$on('photosready', function(events, args){
            $scope.photosready = true; 
            $scope.myfeed= args; 
            console.log($scope.photosready);
            console.log($scope.myfeed);
            $scope.$root.$digest()

        })

        $scope.myprojects = [
            {
                "title": "WDJC", 
                "description": "DJ is a procedural scripting language for algorithmic music production.", 
                "year": "PLT, 2013",
                "link": "http://whet-plt.github.io/wdjc/", 
                "docLink": "https://github.com/WHET-PLT/documents",
                "image": "img/WHET.png"
            }, 
            {   "title": "Squareday", 
                "description": "SquareDay is a FourSquare based schedule generator.", 
                "year": "User Interace Design, 2013",
                "link": "http://squareday.github.io/squareday/", 
                "docLink": "http://squareday.github.io/squareday/SquareDay_user.pdf", 
                "image": "img/squareday.png"
            }, 
            {
                "title": "Strokes", 
                "description": "A gesture based video controlling web application.", 
                "year": "User Interface Design, 2013",
                "link": "http://hilagutfreund.github.io/Strokes/", 
                "docLink": "http://hilagutfreund.github.io/Strokes/documentation.html",
                "image": "img/daftPunk.jpg" 
            }
        ];

    
    });


