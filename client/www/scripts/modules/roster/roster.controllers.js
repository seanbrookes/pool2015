Roster.controller('RosterProtectedController', [
  '$scope',
  '$log',
  'RosterService',
  function($scope, $log, RosterService) {
    $log.debug('Roster Protected Controller');

    $scope.currentProtectedRoster = 'bashers';

    $scope.rosters = RosterService.getAllRosters()
      .then(function(rosters) {
        var rosters = [];

        $scope.rosters = rosters;
      });
    function refreshProtectedRosters() {
      $scope.protectedRrosters = RosterService.getAllRosters()
        .then(function(rosters) {
          $scope.protectedRrosters = [];
          rosters.map(function(roster) {
            var sortedRoster = $scope.protectedSort(roster);
            $scope.protectedRrosters.push(sortedRoster);
          });

          //$scope.rosters = rosters;
        });
    }
    $scope.protectedRrosters = RosterService.getAllRosters()
      .then(function(rosters) {
        $scope.protectedRrosters = [];
        rosters.map(function(roster) {
          var sortedRoster = $scope.protectedSort(roster);
          $scope.protectedRrosters.push(sortedRoster);
        });

        //$scope.rosters = rosters;
      });

    $scope.getPlayerRowClass = function(index) {
      if (index < 11) {
        return 'protected-row';
      }
      return;
    };

    $scope.protectedSort = function(roster) {
      var retArray = [];
      var protectedArray = [];
      var unprotectedArray = [];
      roster.players.map(function(player) {
        if (player.status === 'protected') {
          protectedArray.push(player);
        }
        else {
          unprotectedArray.push(player);
        }

      });

      // merge the arrays
      roster.players = protectedArray.concat(unprotectedArray);

      return roster;

    };

    $scope.upateProtectedStatus = function() {
      var self = this;
      $log.debug('what is this: ' + self.player.status);
      RosterService.updateRoster(self.$parent.roster)
        .$promise
        .then(function(response) {
          refreshProtectedRosters();
        });

    }
  }
]);

Roster.controller('RosterMainController',[
  '$scope',
  'RosterService',
  'Roster',
  'Dailybatterstat',
  'Dailypitcherstat',
  'Totals',
  '$stateParams',
  function($scope, RosterService, Roster, Dailybatterstat, Dailypitcherstat, Totals, $stateParams){
    console.log('Roster Main Controller');
    $scope.currentRosterName = $stateParams.name;
    var authUser = localStorage.getItem('homeRoster');
    $scope.canEdit = false;
    $scope.batterTotal = 0;
    $scope.starterTotal = 0;
    $scope.closerTotal = 0;

    //$scope.player = {
    //  draftStatus:'roster',
    //  status:'regular',
    //  posType:'hitter'
    //};
    $scope.player = {};

//    var filter = {
//      'filter[where][roster]':$scope.currentRosterName,
//      'filter[order]':'lastUpdate DESC',
//      'filter[limit]':1
//    };
    var filter = {
      'filter[where][roster]':$scope.currentRosterName,
      'filter[order]':'mlbid',
      'filter[order]':'lastUpdate DESC'
    };
   // $scope.currentRoster = Roster.query(filter);

    $scope.positionSort = function(roster) {
      var cArray = [];
      var oneBArray = [];
      var twoBArray = [];
      var threeBArray = [];
      var ssArray = [];
      var lfArray = [];
      var cfArray = [];
      var rfArray = [];
      var dhArray = [];
      var spArray = [];
      var rpArray = [];
      roster.players.map(function(player) {

        switch(player.pos) {

          case 'C':
            cArray.push(player);
            break;
          case '1B':
            oneBArray.push(player);
            break;
          case '2B':
            twoBArray.push(player);
            break;
          case '3B':
            threeBArray.push(player);
            break;
          case 'SS':
            ssArray.push(player);
            break;
          case 'LF':
            lfArray.push(player);
            break;
          case 'CF':
            cfArray.push(player);
            break;
          case 'RF':
            rfArray.push(player);
            break;
          case 'DH':
            dhArray.push(player);
            break;
          case 'SP':
            spArray.push(player);
            break;
          case 'RP':
            rpArray.push(player);
            break;

          default:

        }



      });



      // merge the arrays
      var positionArray = cArray.concat(oneBArray)
        .concat(twoBArray)
        .concat(threeBArray)
        .concat(ssArray)
        .concat(lfArray)
        .concat(cfArray)
        .concat(rfArray)
        .concat(dhArray);

      return positionArray;

    };

    /*
    *
    * Batters
    *
    * */
    $scope.currentRawBatters = Dailybatterstat.query(filter);
    $scope.currentRawBatters.$promise.
      then(function (result) {
        $scope.currentBatters = result;
        var batterSubtotal = totalAndSortBatters(result);
        $scope.batters = batterSubtotal.batters;
        $scope.batterTotal = batterSubtotal.subTotal;

      }).
      then(function(response){
        /*
         *
         *
         * Starters
         *
         * */
        $scope.currentPitchers = Dailypitcherstat.query(filter);
        $scope.currentPitchers.$promise.
          then(function (result) {
            var currentPitchers = result;
            var startersArray = [];
            var closersArray = [];

            angular.forEach(currentPitchers, function(value, key){
                if (value.pos === 'SP'){
                  startersArray.push(value);
                }
                else if (value.pos === 'RP') {
                  closersArray.push(value);
                }
                else{
                  console.log(' pitcher with no pos: ' + JSON.stringify(value));
                }
              }
            );
            $scope.starters = totalAndSortStarters(startersArray).starters;
            $scope.closers = totalAndSortClosers(closersArray).closers;
            // return ({starters:originalArray,subTotal:startersSubTotal});
            $scope.starterTotal = totalAndSortStarters(startersArray).subTotal;
            $scope.closerTotal = totalAndSortClosers(closersArray).subTotal;

            totalErUp();


          });
      });


    function compareTotals(a,b) {

      if (a.total > b.total){
        return -1;
      }
      if (a.total < b.total){
        return 1;
      }
      return 0;
    }
    var totalAndSortBatters = function(rawBatters){
      var battersSubTotal = 0;
      var catchersArray = [];
      var firstBArray = [];
      var twoBArray = [];
      var threeBArray = [];
      var ssArray = [];
      var lfArray = [];
      var cfArray = [];
      var rfArray = [];
      var dhArray = [];

      var returnArray = [];

      for (var i = 0;i < rawBatters.length;i++){
        var player = rawBatters[i];

        // add total property
        //player = totalBatterScore(player);
        switch(player.pos){

          case 'C':
            catchersArray.push(player);
            break;
          case '1B':
            firstBArray.push(player);

            break;

          case '2B':
            twoBArray.push(player);

            break;
          case '3B':
            threeBArray.push(player);

            break;
          case 'SS':
            ssArray.push(player);

            break;
          case 'LF':
            lfArray.push(player);

            break;
          case 'CF':
            cfArray.push(player);

            break;
          case 'RF':
            rfArray.push(player);

            break;

          case 'DH':
            dhArray.push(player);

            break;
          default:

        }

      }

      // set augmented properties
      // total
      // sort
      // establish counting property
      if (catchersArray.length > 0){
        catchersArray.sort(compareTotals);
        catchersArray[0].counting = true;
        battersSubTotal += catchersArray[0].total;
      }
      if (firstBArray.length > 0){
        firstBArray.sort(compareTotals);
        firstBArray[0].counting = true;
        battersSubTotal += firstBArray[0].total;
      }
      if (twoBArray.length > 0){
        twoBArray.sort(compareTotals);
        twoBArray[0].counting = true;
        battersSubTotal += twoBArray[0].total;
      }
      if (threeBArray.length > 0){
        threeBArray.sort(compareTotals);
        threeBArray[0].counting = true;
        battersSubTotal += threeBArray[0].total;
      }
      if (ssArray.length > 0){
        ssArray.sort(compareTotals);
        ssArray[0].counting = true;
        battersSubTotal += ssArray[0].total;
      }
      if (lfArray.length > 0){
        lfArray.sort(compareTotals);
        lfArray[0].counting = true;
        battersSubTotal += lfArray[0].total;
      }
      if (cfArray.length > 0){
        cfArray.sort(compareTotals);
        cfArray[0].counting = true;
        battersSubTotal += cfArray[0].total;
      }
      if (rfArray.length > 0){
        rfArray.sort(compareTotals);
        rfArray[0].counting = true;
        battersSubTotal += rfArray[0].total;
      }
      if (dhArray.length > 0){
        dhArray.sort(compareTotals);
        dhArray[0].counting = true;
        battersSubTotal += dhArray[0].total;
      }
      /*
       *
       * Merge all the arrays
       *
       * */
      returnArray = $.merge(returnArray,catchersArray);
      returnArray = $.merge(returnArray,firstBArray);
      returnArray = $.merge(returnArray,twoBArray);
      returnArray = $.merge(returnArray,threeBArray);
      returnArray = $.merge(returnArray,ssArray);
      returnArray = $.merge(returnArray,lfArray);
      returnArray = $.merge(returnArray,cfArray);
      returnArray = $.merge(returnArray,rfArray);
      returnArray = $.merge(returnArray,dhArray);

      return ({batters:returnArray,subTotal:battersSubTotal});
    };


    /*
     *
     * Starters Total
     *
     * */
    var totalAndSortStarters = function(originalArray){
      var startersSubTotal = 0;
//      for (var i = 0;i < originalArray.length;i++){
//        originalArray[i].total = ((originalArray[i].wins * 15) - (originalArray[i].losses * 4) + (originalArray[i].k / 2))
//      }
      originalArray.sort(compareTotals);
      if (originalArray[0]){
        originalArray[0].counting = true;
        startersSubTotal += originalArray[0].total;
      }
      if (originalArray[1]){
        originalArray[1].counting = true;
        startersSubTotal += originalArray[1].total;
      }
      if (originalArray[2]){
        originalArray[2].counting = true;
        startersSubTotal += originalArray[2].total;
      }
      if (originalArray[3]){
        originalArray[3].counting = true;
        startersSubTotal += originalArray[3].total;
      }

      return ({starters:originalArray,subTotal:startersSubTotal});
    };
    /*
     *
     * Closers Total
     *
     * */
    var totalAndSortClosers = function(originalArray){
      var closersSubTotal = 0;

      originalArray.sort(compareTotals);
      if (originalArray[0]){
        originalArray[0].counting = true;
        closersSubTotal += originalArray[0].total;
      }
      if (originalArray[1]){
        originalArray[1].counting = true;
        closersSubTotal += originalArray[1].total;
      }

      return ({closers:originalArray,subTotal:closersSubTotal});
    };


    var totalErUp = function(){
      var x = moment().format('YYYY-MM-DD');
      $scope.grandTotal =( $scope.batterTotal + $scope.starterTotal + $scope.closerTotal );
      var newTotalsRecord = {
        date:moment().format('YYYY-MM-DD'),
        roster:$scope.currentRosterName,
        grandTotal:$scope.grandTotal,
        batterTotal:$scope.batterTotal,
        starterTotal:$scope.starterTotal,
        closerTotal:$scope.closerTotal
      };

      Totals.create(newTotalsRecord);
      // record the totals
      // date stamp
      // roster
      //

    }


  }
]);
