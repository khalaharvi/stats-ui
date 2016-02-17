angular.module('statusApp')
.factory('StatusFactory', function($http){
    var statusFactory = {};
    
    statusFactory.getStatsData = function(){
        return $http.get("/assets/data/stats.json");
    };
    
    
    return statusFactory;
});