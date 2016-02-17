angular.module('app.routes',['ngRoute'])

.config(($routeProvider, $locationProvider) => {
   $routeProvider
        .when('/',{
            templateUrl: 'app/views/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        })
        
        .when('/summary',{
            templateUrl: 'app/views/summary.html',
            controller: 'SummaryController',
            controllerAs: 'summary'
        }) 
        
        .when('/traffic',{
            templateUrl: 'app/views/traffic.html',
            controller: 'TrafficControler',
            controllerAs: 'traffic'
        });  
});