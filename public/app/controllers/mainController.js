angular.module('statusApp')
.controller('MainController', ['StatusFactory','$interval', function(StatusFactory,$interval){
    var vm = this;
    vm.summaryTab = 'selected_tab';
    vm.trafficTab = 'unselected_tab';
    vm.showMemberContent = false;
    vm.showSummaryContent = true;
    vm.summaryData = {};
    vm.memberTrafficData = {};
    
    var statsKeeper = {};
    var incrementBuyerStats, incrementSearchStats, incrementViewMemberStats;
    
    function getStatsData()
    {
        StatusFactory.getStatsData()
        .success(function(data) {
            if(data !== undefined && data.length === 2)
            {
                storeSummaryData(data[0]);
                vm.memberTrafficData = data[1];   
                
            }
        })
        .error(function(data){
            console.log(data);  
        });   
    }
    
    function storeSummaryData(summary)
    {
        vm.summaryData = _.forEach(summary, function(item){
            if(item.count !== undefined && item.count !== null)
            {
                item.count = parseInt(item.count);
            }
            if(createStatKey.call(item.countTxt) === 'viewsofourmemberpages')
            {
                item.participantCount = parseInt(item.participantCount.split(',').join(''));
            }
            else 
            {
                item.participantCount = parseInt(item.participantCount);
            }
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
    
    vm.Animate = function(){
       if(vm.showSummaryContent)
       {
        
        _.forEach(vm.summaryData, function(summary){
            statsKeeper[createStatKey.call(summary.countTxt)] = summary.count;
            summary.participantCount -= summary.count; 
            summary.count = 0;
        });
        
        incrementBuyerStats = $interval(animateStats.bind(vm.summaryData[0]),500);
        incrementSearchStats = $interval(animateStats.bind(vm.summaryData[1]),200);
        incrementViewMemberStats = $interval(animateStats.bind(vm.summaryData[2]),100);   
       }
    };
    
    function createStatKey()
    {
        return this.split(' ').join('').toLowerCase();
    }
    
    function animateStats()
    {
        if(this.count < statsKeeper[createStatKey.call(this.countTxt)])
        {
            this.count++;
            this.participantCount++;
        }
        else{
            stopInterval.call(createStatKey.call(this.countTxt));
        }
    }
    
    function stopInterval(stat){
        if(angular.isDefined(incrementBuyerStats) && this === 'buyerlogin' )
        {
            $interval.cancel(incrementBuyerStats);    
        }
        if(angular.isDefined(incrementSearchStats) && this === 'searches')
        {
            $interval.cancel(incrementSearchStats);    
        }
        if(angular.isDefined(incrementViewMemberStats) && this === 'viewsofourmemberpages')
        {
            $interval.cancel(incrementViewMemberStats);    
        }
    }
    
    function init(){
        getStatsData();
    }
    
    init();
}]);
