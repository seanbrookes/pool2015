MLB.controller('MLBMainController', [
  '$scope',
  '$log',
  'MLBServices',
  'RosterService',
  function($scope, $log, MLBServices, RosterService) {
    $scope.mlbCtx = {};
    $log.debug('MLB Controller');


    $scope.mlbCtx.currentRosters = RosterService.getAllRosters()
      .then(function(rosters) {
        $scope.currentRosters = rosters;
      });
    $scope.mlbCtx.currentRoster = {};
    //$scope.selectRoster = function() {
    //  $scope.currentRoster = $scope.mlbCtx.currentRosters[];
    //};
    $scope.mlbCtx.currentHitters = MLBServices.getMlbHitters()
      .then(function(hitters) {
      //  $log.debug('eyaaa hitters: ' + hitters);
        $scope.mlbCtx.currentHitters = JSON.parse(hitters);
      })
    $scope.mlbCtx.currentPitchers = MLBServices.getMlbPitchers()
      .then(function(pitchers) {
       // $log.debug('eyaaa hitters: ' + pitchers);
        $scope.mlbCtx.currentPitchers = JSON.parse(pitchers);
      })
  }
]);
