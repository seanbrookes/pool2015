Main.controller('MainController', [
  '$scope',
  '$log',
  function($scope, $log){
    $log.debug('Main Controller');
    $scope.bbpCtx = {
      homeRoster: ''
    };

    if (window.localStorage && window.localStorage.getItem('homeRoster')) {
      $scope.bbpCtx.homeRoster = window.localStorage.getItem('homeRoster');
    }
}]);
