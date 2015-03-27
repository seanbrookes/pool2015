/**
 * Created by seanbrookes on 2014-04-11.
 */
Stats.controller('RankPosController',[
  '$scope',
  'Dailybatterstat',
  'Dailypitcherstat',
  '$stateParams',
  function($scope, Dailybatterstat, Dailypitcherstat, $stateParams) {
    console.log('pos rank controller');


    $scope.currentFilter = $stateParams.pos;
    $scope.showBatters = true;
    $scope.showStarters = false;
    $scope.showClosers = false;


    var filter = {
      'filter[where][pos]': $stateParams.pos,
      'filter[order]': 'mlbid',
      'filter[order]': 'lastUpdate DESC'
    };

    if ($stateParams.pos === 'all'){
      filter = {
        'filter[order]': 'total DESC'
      };
    }


    switch($scope.currentFilter){
      case 'RP':
        $scope.positionRanking = Dailypitcherstat.query(filter);
        $scope.positionRanking.$promise.
          then(function (result) {
            $scope.closers = result;
            $scope.showBatters = false;
            $scope.showStarters = false;
            $scope.showClosers = true;
          }
        );
        break;
      case 'SP':
        $scope.positionRanking = Dailypitcherstat.query(filter);
        $scope.positionRanking.$promise.
          then(function (result) {
            $scope.starters = result;
            $scope.showBatters = false;
            $scope.showStarters = true;
            $scope.showClosers = false;
          }
        );
        break;
      default:
        $scope.positionRanking = Dailybatterstat.query(filter);
        $scope.positionRanking.$promise.
          then(function (result) {
            $scope.batters = result;
            $scope.showBatters = true;
            $scope.showStarters = false;
            $scope.showClosers = false;
          }
        );
        break;
    }



  }
]);