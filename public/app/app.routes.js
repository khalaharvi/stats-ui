angular.module('app.routes',['ngRoute'])

.config(($routeProvider, $locationProvider) => {
   $routeProvider
        .when('/',{
            templateUrl: 'app/views/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        });
});