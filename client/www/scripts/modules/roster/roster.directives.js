Roster.directive('bbpProtectedRoster', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/roster/templates/roster.protected.html',
      controller: [
        '$scope',
        '$log',
        '$state',
        '$stateParams',
        function($scope, $log, $state, $stateParams) {

          $scope.tabNames = ['bashers', 'rallycaps', 'mashers', 'stallions'];

          $scope.activeTabIndex = 0;

          $scope.currentRoster = 'bashers';
          if ($stateParams.slug) {

            $scope.currentRoster = $stateParams.slug;
          }



          $scope.isDisabled = function(rosterSlug) {
            if ($scope.bbpCtx.homeRoster === rosterSlug) {
              return false;
            }
            if ($scope.bbpCtx.homeRoster === 'dog') {
              return false;
            }
            return true;
          }

        }],
      link: function(scope, el, attrs) {

      }
    }
  }
]);
Roster.directive('bbpProtectedRosterList', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/roster/templates/roster.protected.list.html',
      controller: [
        '$scope',
        '$log',
        '$state',
        '$stateParams',
        function($scope, $log, $state, $stateParams) {

        $scope.tabNames = ['bashers', 'rallycaps', 'mashers', 'stallions'];

        $scope.activeTabIndex = 0;
        $scope.currentRoster = 'bashers';
        if ($stateParams.slug) {

          $scope.currentRoster = $stateParams.slug;
        }

        $scope.isDisabled = function(rosterSlug) {
          if ($scope.bbpCtx.homeRoster === rosterSlug) {
            return false;
          }
          if ($scope.bbpCtx.homeRoster === 'dog') {
            return false;
          }
          return true;
        }

      }],
      link: function(scope, el, attrs) {

      }
    }
  }
]);
/*
*
*  http://pool2015.herokuapp.com/#authuser/rallycaps
 * http://pool2015.herokuapp.com/#authuser/bashers
 * http://pool2015.herokuapp.com/#authuser/mashers
 * http://pool2015.herokuapp.com/#authuser/stallions
*
* */
