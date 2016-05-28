var DocumentType = {
  templateUrl: 'jsApp/templates/typing.html',
  controller: function(storeInputService, docService, $interval, $scope, $rootScope, $stateParams) {
    var percent   = 0;
    var ctrl = this;
    ctrl.body     = '';
    ctrl.count    = 0;
    ctrl.inputArr = storeInputService;
    ctrl.docArr   = docService.documentArr;
    ctrl.percentCorrect = percent;
    ctrl.docId    = docService.document.id;
    ctrl.currentDocScore = docService.currentDocScore;

    storeInputService.clearOut();
    $scope.id = $stateParams.id;

    $scope.$on('timeAvailable', function(e, time) {
      ctrl.time = time;
    });

    ctrl.appendWord = function(input) {
      // broadcasts start of session to timeDirective over $rootScope
      // should unsubscribe somehow
      ctrl.inputArr.length === 0 ? $rootScope.$broadcast('startSession') : null;
      storeInputService.formatAndAddWord(ctrl, input);
      ctrl.inputArr.length === ctrl.docArr.length ? ctrl.endSession() : null;
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
      docService.updateScore(this.docId, this.percentCorrect, ctrl.time);
    };

    $scope.restart = function() {
      ctrl.body     = '';
      ctrl.count    = 0;
      ctrl.inputArr = [];
      ctrl.docArr   = docService.documentArr;
      ctrl.percentCorrect = percent;
      ctrl.currentDocScore = docService.currentDocScore;
    };

  },
  controllerAs: 'typing'
};

angular
  .module('app')
  .component('documentType', DocumentType);
