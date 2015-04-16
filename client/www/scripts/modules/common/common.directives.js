Common.directive('grandTotalsSummaryList', [
  'Totals',
  function(Totals){
    return{
      restrict: 'E',
      templateUrl: './scripts/modules/common/templates/totals.list.html',
      replace: true,
      controller:[
        '$scope',
        function($scope){
          var filter = {
            'filter[order]':'date DESC'
          };

          var initTotals = Totals.query(filter);
          initTotals
            .$promise
            .then(function (result) {
              var beginArray = result;
              var returnArray = [];

              var totalsComparitorObj = {
                bashers:{
                  latest:{
                    grandTotal:0,
                    hitterTotal:0,
                    starterTotal:0,
                    closerTotal:0
                  },
                  previous:{
                    grandTotal:0,
                    hitterTotal:0,
                    starterTotal:0,
                    closerTotal:0
                  }
                },
                mashers:{
                  latest:{
                    grandTotal:0,
                    hitterTotal:0,
                    starterTotal:0,
                    closerTotal:0
                  },
                  previous:{
                    grandTotal:0,
                    hitterTotal:0,
                    starterTotal:0,
                    closerTotal:0
                  }
                },
                rallycaps:{
                  latest:{
                    grandTotal:0,
                    hitterTotal:0,
                    starterTotal:0,
                    closerTotal:0
                  },
                  previous:{
                    grandTotal:0,
                    hitterTotal:0,
                    starterTotal:0,
                    closerTotal:0
                  }
                },
                stallions:{
                  latest:{
                    grandTotal:0,
                    hitterTotal:0,
                    starterTotal:0,
                    closerTotal:0
                  },
                  previous:{
                    grandTotal:0,
                    hitterTotal:0,
                    starterTotal:0,
                    closerTotal:0
                  }
                }

              };
              var latestDate;
              var previousDate;
              var rosterChecklist = [];
              for (var i = 0;i  <  beginArray.length;i++){
                var currTotalRecord = beginArray[i];
                if (!latestDate){
                  latestDate = beginArray[0].date;
                  previousDate = moment(latestDate).subtract('days',1).format('YYYY-MM-DD');
                  console.log('dates: ' + latestDate + ':' + moment(previousDate).format('YYYY-MM-DD'));
                }
                switch(currTotalRecord.roster){

                  case 'bashers':
                    if (currTotalRecord.date === latestDate){
                      if (!totalsComparitorObj.bashers.latest.date){
                        totalsComparitorObj.bashers.latest.date = currTotalRecord.date;
                        totalsComparitorObj.bashers.latest.grandTotal = currTotalRecord.grandTotal;
                        totalsComparitorObj.bashers.latest.hitterTotal = currTotalRecord.hitterTotal;
                        totalsComparitorObj.bashers.latest.starterTotal = currTotalRecord.starterTotal;
                        totalsComparitorObj.bashers.latest.closerTotal = currTotalRecord.closerTotal;
                      }
                    }
                    if (currTotalRecord.date === previousDate){
                      if (!totalsComparitorObj.bashers.previous.date){
                        totalsComparitorObj.bashers.previous.date = currTotalRecord.date;
                        totalsComparitorObj.bashers.previous.grandTotal = currTotalRecord.grandTotal;
                        totalsComparitorObj.bashers.previous.hitterTotal = currTotalRecord.hitterTotal;
                        totalsComparitorObj.bashers.previous.starterTotal = currTotalRecord.starterTotal;
                        totalsComparitorObj.bashers.previous.closerTotal = currTotalRecord.closerTotal;
                      }
                    }
                    break;
                  case 'mashers':
                    if (currTotalRecord.date === latestDate){
                      if (!totalsComparitorObj.mashers.latest.date){
                        totalsComparitorObj.mashers.latest.date = currTotalRecord.date;
                        totalsComparitorObj.mashers.latest.grandTotal = currTotalRecord.grandTotal;
                        totalsComparitorObj.mashers.latest.hitterTotal = currTotalRecord.hitterTotal;
                        totalsComparitorObj.mashers.latest.starterTotal = currTotalRecord.starterTotal;
                        totalsComparitorObj.mashers.latest.closerTotal = currTotalRecord.closerTotal;
                      }
                    }
                    if (currTotalRecord.date === previousDate){
                      if (!totalsComparitorObj.mashers.previous.date){
                        totalsComparitorObj.mashers.previous.date = currTotalRecord.date;
                        totalsComparitorObj.mashers.previous.grandTotal = currTotalRecord.grandTotal;
                        totalsComparitorObj.mashers.previous.hitterTotal = currTotalRecord.hitterTotal;
                        totalsComparitorObj.mashers.previous.starterTotal = currTotalRecord.starterTotal;
                        totalsComparitorObj.mashers.previous.closerTotal = currTotalRecord.closerTotal;
                      }
                    }
                    break;
                  case 'rallycaps':
                    if (currTotalRecord.date === latestDate){
                      if (!totalsComparitorObj.rallycaps.latest.date){
                        totalsComparitorObj.rallycaps.latest.date = currTotalRecord.date;
                        totalsComparitorObj.rallycaps.latest.grandTotal = currTotalRecord.grandTotal;
                        totalsComparitorObj.rallycaps.latest.hitterTotal = currTotalRecord.hitterTotal;
                        totalsComparitorObj.rallycaps.latest.starterTotal = currTotalRecord.starterTotal;
                        totalsComparitorObj.rallycaps.latest.closerTotal = currTotalRecord.closerTotal;
                      }
                    }
                    if (currTotalRecord.date === previousDate){
                      if (!totalsComparitorObj.rallycaps.previous.date){
                        totalsComparitorObj.rallycaps.previous.date = currTotalRecord.date;
                        totalsComparitorObj.rallycaps.previous.grandTotal = currTotalRecord.grandTotal;
                        totalsComparitorObj.rallycaps.previous.hitterTotal = currTotalRecord.hitterTotal;
                        totalsComparitorObj.rallycaps.previous.starterTotal = currTotalRecord.starterTotal;
                        totalsComparitorObj.rallycaps.previous.closerTotal = currTotalRecord.closerTotal;
                      }
                    }
                    break;
                  case 'stallions':
                    if (currTotalRecord.date === latestDate){
                      if (!totalsComparitorObj.stallions.latest.date){
                        totalsComparitorObj.stallions.latest.date = currTotalRecord.date;
                        totalsComparitorObj.stallions.latest.grandTotal = currTotalRecord.grandTotal;
                        totalsComparitorObj.stallions.latest.hitterTotal = currTotalRecord.hitterTotal;
                        totalsComparitorObj.stallions.latest.starterTotal = currTotalRecord.starterTotal;
                        totalsComparitorObj.stallions.latest.closerTotal = currTotalRecord.closerTotal;
                      }
                    }
                    if (currTotalRecord.date === previousDate){
                      if (!totalsComparitorObj.stallions.previous.date){
                        totalsComparitorObj.stallions.previous.date = currTotalRecord.date;
                        totalsComparitorObj.stallions.previous.grandTotal = currTotalRecord.grandTotal;
                        totalsComparitorObj.stallions.previous.hitterTotal = currTotalRecord.hitterTotal;
                        totalsComparitorObj.stallions.previous.starterTotal = currTotalRecord.starterTotal;
                        totalsComparitorObj.stallions.previous.closerTotal = currTotalRecord.closerTotal;
                      }
                    }
                    break;
                  default:



                }
//
//                currTotalRecord.grandTotalDelta = getGrandTotalDelta(currTotalRecord.roster,totalsComparitorObj);
//
//                returnArray.push(currTotalRecord);

              }
              for (var k = 0;k  <  beginArray.length;k++){
                currTotalRecord = beginArray[k];


                currTotalRecord.grandTotalDelta = getGrandTotalDelta(currTotalRecord.roster,totalsComparitorObj);

                returnArray.push(currTotalRecord);

              }




              //console.log('COMPARITOR: ' + JSON.stringify(totalsComparitorObj));

              $scope.grandTotals = returnArray;

            }
          );
          var getGrandTotalDelta = function(roster, compObj){
            return 0;
            //if (compObj[roster].previous.grandTotal !== 0){
            //  return (compObj[roster].latest.grandTotal - compObj[roster].previous.grandTotal);
            //}
          }
        }
      ]
    }
  }
]);
Common.directive('bbpAppHeader', [

  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/common/templates/app.header.html',
      replace: true,
      controller: [
        '$scope',
        '$stateParams',
        function($scope, $stateParams) {
          $scope.headerCtx = {};
          $scope.headerCtx.currentRoster = $stateParams.slug;
      }],
      link: function(scope, el, attrs) {


        scope.$watch('bbpCtx.currentRoster', function(newRoster, oldRoster) {
          scope.headerCtx.currentRoster = newRoster;
        }, true);
      }
    }
  }
]);
Common.directive('posRankNavList', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/common/templates/pos.rank.nav.list.html',
      replace: true,
      controller:function(){}
    }
  }
]);
Common.directive('generalTotalsSummaryList', [
  'Totals',
  function(Totals){
    return{
      restrict: 'E',
      templateUrl: './scripts/modules/common/templates/general.totals.html',
      controller:[
        '$scope',
        function($scope){
          var filter = {};

          $scope.rosters = Totals.query(filter);
          $scope.rosters.$promise.
            then(function (result) {
              $scope.rosters = result;

            }
          );


        }
      ]
    }
  }
]);



/**
 * sl-common-enter
 *
 * calls a scope method on click event
 *
 * <input ng-enter="method()" />
 *
 *
 * */
Common.directive('slCommonEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.slCommonEnter);
        });

        event.preventDefault();
      }
    });
  };
});
 /**
 * sl-common-select-on-click
 *
 * generic attribute directive to autoselect the contents of an input
 * by single clicking the content
 *
 * */
Common.directive('slCommonSelectOnClick', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.on('click', function () {
        this.select();
      });
    }
  };
});
Common.directive('slCommonLoadingIndicator', [
  function() {
    return {
      template: '<span us-spinner="{{props}}"></span>',
      controller: function($scope, $attrs){
        $scope.size = $attrs.size || 'large';

        switch($scope.size){
          case 'small':
            $scope.props = '{radius:6, width:2, length: 4, color:\'#999\'}';
            break;
          case 'large':
          default:
            $scope.props = '{radius:30, width:8, length: 24, color:\'#7DBD33\'}';
            break;
        }
      }
    }
  }
]);
