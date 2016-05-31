function TypingCtrl(storeInputService, docService, $interval, $scope, $rootScope, $stateParams) {
  var ctrl             = this;
  var percent          = 0;
  var scoreType        = 'typing';
  ctrl.body            = '';
  ctrl.count           = 0;
  ctrl.documentAttrs   = $scope.$parent.document;
  // need to asynch score filter and graph update
  ctrl.scores          = ctrl.documentAttrs.currentDocScore.scores

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
    // docService.addDoc(id).then(function(resp){});
    $rootScope.$broadcast('sessionEnded');   // broadcasts end of session to timeDirective over $rootScope
    var correct = 0;
    angular.forEach(ctrl.documentAttrs.inputArr, function(word){
        correct += (word.e === 'match') ? 1 : 0;
    });
    ctrl.documentAttrs.percentCorrect = Math.floor(correct/ctrl.documentAttrs.inputArr.length * 100, -1);
    docService.updateScore(ctrl.documentAttrs.docId, ctrl.documentAttrs.percentCorrect, ctrl.time, scoreType);
  };

  $scope.restart = function() {
    $rootScope.$broadcast('restartSession');
    ctrl.body     = '';
    ctrl.count    = 0;
  };

  // hides speech input
  if (document.getElementById("skitt-ui")) {
    document.getElementById('skitt-ui').className += ' hidden';
  };

};

angular
  .module('app')
  .controller('TypingCtrl', TypingCtrl);
