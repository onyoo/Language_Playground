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

  storeInputService.clearOut();
  $scope.id = $stateParams.id;

  $scope.$on('timeAvailable', function(e, time) {
    input.time = time;
  });

  this.appendWord = function(input) {
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
        correct += (word.e === 'match')  ? 1 : 0;
    });
    this.percentCorrect = Math.floor(correct/this.inputArr.length * 100, -1);
    docService.updateScore(this.docId, this.percentCorrect, input.time);
  };
};

angular
  .module('app')
  .controller('InputCtrl', InputCtrl);
