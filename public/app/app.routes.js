angular.module('app.routes',['ngRoute'])

.config(function($routeProvider, $locationProvider) {
   $routeProvider
        .when('/',{
            templateUrl: 'app/views/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        });
});