function TypingCtrl(storeInputService, docService, $interval, $scope, $rootScope, $stateParams) {
  var ctrl             = this;
  var percent          = 0;
  ctrl.body            = '';
  ctrl.count           = 0;
  ctrl.documentAttrs   = $scope.$parent.document;

  storeInputService.clearOut();
  $scope.id = $stateParams.id;

  $scope.$on('timeAvailable', function(e, time) {
    ctrl.time = time;
  });

  ctrl.appendWord = function(input) {
    // broadcasts start of session to timeDirective over $rootScope
    // should unsubscribe somehow
    ctrl.documentAttrs.inputArr.length === 0 ? $rootScope.$broadcast('startSession') : null;
    storeInputService.formatAndAddWord(ctrl, input);
    ctrl.documentAttrs.inputArr.length === ctrl.documentAttrs.docArr.length ? ctrl.endSession() : null;
    ctrl.count++;
    input.body = '';
  };

  ctrl.endSession = function() {
    // broadcasts end of session to timeDirective over $rootScope
    $rootScope.$broadcast('sessionEnded');
    var correct = 0;
    angular.forEach(this.inputArr, function(word){
        correct += (word.e === 'match') ? 1 : 0;
    });
    this.percentCorrect = Math.floor(correct/this.inputArr.length * 100, -1);
    docService.updateScore(ctrl.documentAttrs.docId, ctrl.documentAttrs.percentCorrect, ctrl.time);
  };

  $scope.restart = function() {
    ctrl.body     = '';
    ctrl.count    = 0;
    ctrl.documentAttrs.inputArr = [];
    ctrl.documentAttrs.docArr   = docService.documentArr;
    ctrl.percentCorrect = percent;
    ctrl.documentAttrs.currentDocScore = docService.currentDocScore;
  };

};

angular
  .module('app')
  .controller('TypingCtrl', TypingCtrl);
