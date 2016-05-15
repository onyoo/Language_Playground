function InputCtrl(storeInputService, docService, $interval, $scope, $rootScope, $stateParams) {
  var input     = this;
  var percent   = 0;
  this.body     = '';
  this.count    = 0;
  this.inputArr = storeInputService;
  this.docArr   = docService.documentArr;
  this.percentCorrect = percent;
  this.docId    = docService.document.id;
  this.currentDocScore = docService.currentDocScore;
  var ctrl = this;

  storeInputService.clearOut();
  $scope.id = $stateParams.id;

  $scope.$on('timeAvailable', function(e, time) {
    input.time = time;
  });

  ctrl.appendWord = function(input) {
    // broadcasts start of session to timeDirective over $rootScope
    // should unsubscribe somehow
    this.inputArr.length === 0 ? $rootScope.$broadcast('startSession') : null;
    storeInputService.formatAndAddWord(this, input);
    this.inputArr.length === this.docArr.length ? this.endSession() : null;
    this.count += 1;
    input.body = '';
  };

  this.endSession = function() {
    // broadcasts end of session to timeDirective over $rootScope
    $rootScope.$broadcast('sessionEnded');
    var correct = 0;
    angular.forEach(this.inputArr, function(word){
        correct += (word.e === 'match') ? 1 : 0;
    });
    this.percentCorrect = Math.floor(correct/this.inputArr.length * 100, -1);
    docService.updateScore(this.docId, this.percentCorrect, input.time);
  };

  var commands = {
    '*val' : function(val) {
      ctrl.voiceInput = val;
      $scope.$apply();
      ctrl.addText(val);
    }
  }

  ctrl.addText = function(text) {
    storeInputService.addText(ctrl, text);
    ctrl.count = ctrl.inputArr.length;
    $scope.$apply()
  };

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
  .controller('InputCtrl', InputCtrl);
