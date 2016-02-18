'use strict';
angular.module('statusApp')
.controller('MainController', ['StatusFactory', function(StatusFactory){
    var vm = this;
    vm.summaryTab = 'selected_tab';
    vm.trafficTab = 'unselected_tab';
    vm.showMemberContent = false;
    vm.showSummaryContent = true;
    vm.summaryData = {};
    vm.memberTrafficData = {};
    
    function getStatsData()
    {
        StatusFactory.getStatsData()
        .success(function(data) {
            if(data !== undefined && data.length === 2)
            {
                vm.summaryData = data[0];
                vm.memberTrafficData = data[1];   
            }
        })
        .error(function(data){
            console.log(data);  
        });   
    }
    
    vm.SelectNavButton = function(selectedTab){
      if(selectedTab === 'Summary')
      {
          vm.summaryTab = 'selected_tab';
          vm.trafficTab = 'unselected_tab';
          
          vm.showMemberContent = false;
          vm.showSummaryContent = true;
      }
      else if(selectedTab === 'Traffic')
      {
          vm.summaryTab = 'unselected_tab';
          vm.trafficTab = 'selected_tab';
          
           vm.showMemberContent = true;
          vm.showSummaryContent = false;
      }  
    };
    
    function init(){
        getStatsData();
    }
    
    init();
}]);
