function SpeakingCtrl(docService, storeInputService, $interval, $scope, $rootScope, $stateParams) {
  var ctrl      = this;
  var percent   = 0;
  var scoreType = 'speaking';
  ctrl.body     = '';
  ctrl.count    = 0;
  ctrl.documentAttrs = $scope.$parent.document;

  storeInputService.clearOut();
  $scope.id = $stateParams.id;

  $scope.$on('timeAvailable', function(e, time) {
    ctrl.time = time;
  });

  ctrl.appendWord = function(input) {
    // broadcasts start of session to timeDirective over $rootScope
    // should unsubscribe somehow
    ctrl.documentAttrs.inputArr.length === 0 ? $rootScope.$broadcast('startSession') : null;
    storeInputService.formatAndAddWord(this, input);
    ctrl.documentAttrs.inputArr.length === ctrl.documentAttrs.docArr.length ? this.endSession() : null;
    ctrl.count++;
    input.body = '';
  };

  this.endSession = function() {
    // broadcasts end of session to timeDirective over $rootScope
    $rootScope.$broadcast('sessionEnded');
    var correct = 0;
    angular.forEach(ctrl.documentAttrs.inputArr, function(word){
        correct += (word.e === 'match') ? 1 : 0;
    });
    ctrl.percentCorrect = Math.floor(correct/ctrl.documentAttrs.inputArr.length * 100, -1);
    docService.updateScore(ctrl.documentAttrs.docId, ctrl.percentCorrect, ctrl.time, scoreType);
  };

  ctrl.addText = function(text) {
    ctrl.documentAttrs.inputArr.length === 0 ? $rootScope.$broadcast('startSession') : null;
    storeInputService.addText(ctrl, text);
    $scope.$apply()
    ctrl.documentAttrs.inputArr.length >= ctrl.documentAttrs.docArr.length ? ctrl.endSession() : null;
  };

  $scope.restart = function() {
    $rootScope.$broadcast('restartSession');
    ctrl.body     = '';
    ctrl.count    = 0;
  };

  var commands = {
    '*val' : function(val) {
      ctrl.voiceInput = val;
      $scope.$apply();
      ctrl.addText(val);
    }
  }

  if (annyang) {
    // Add our commands to annyang
    annyang.addCommands(commands);
    // Tell KITT to use annyang
    SpeechKITT.annyang();
    // Define a stylesheet for KITT to use
    SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');
    // Render KITT's interface
    SpeechKITT.vroom();
  }
};

angular
  .module('app')
  .controller('SpeakingCtrl', SpeakingCtrl);
