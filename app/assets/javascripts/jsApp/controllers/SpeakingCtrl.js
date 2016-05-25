function SpeakingCtrl() {
  var ctrl = this;
  ctrl.info = ["this is ", "a string", " in an array"," yay!"]

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
