function MainCtrl (docService, $rootScope, $filter, $stateParams, $scope, $interval) {

  this.documents = docService.documents;
  this.document = docService.document;
  this.search = '';
  this.timer = 0;
  this.getDocs = function(){
    docService.getAll();
  }
  var scope = this;

  this.fight = function() {
    // Don't start a new fight if we are already fighting
    if ( angular.isDefined(stop) ) return;

    stop = $interval(function() {
      if (scope.timer > 0) {
        $scope.timer -= 1;
      } else {
        scope.stopFight();
      }
    }, 100);
  };

  this.stopFight = function() {
    if (angular.isDefined(stop)) {
      $interval.cancel(stop);
      stop = undefined;
    }
  };

  this.resetFight = function() {
    scope.timer = 0;
  };

  $scope.$on('$destroy', function() {
    // Make sure that the interval is destroyed too
    scope.stopFight();
  });
}

angular
  .module('app')
  .controller('MainCtrl', MainCtrl)
