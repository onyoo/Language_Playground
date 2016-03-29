function InputCtrl(storeInputService, docService, $interval, $scope, $rootScope) {
  var input     = this;
  var percent   = 0;
  var timePromise;
  this.body     = '';
  this.count    = 0;
  this.inputArr = storeInputService;
  this.docArr   = docService.documentArr;
  this.percentCorrect = percent;

  this.appendWord = function(input) {
    storeInputService.formatAndAddWord(this, input)
    this.inputArr.length === this.docArr.length ? this.endSession() : null;
    this.count += 1;
    input.body = '';
  };

  this.endSession = function() {
    // broadcasts end of session to timeDirective over $rootScope
    $rootScope.$broadcast("sessionEnded");
    var correct = 0;
    angular.forEach(this.inputArr, function(word){
        correct += (word.e === 'match')  ? 1 : 0;
    });
    this.percentCorrect = Math.floor(correct/this.inputArr.length * 100, -1);
  };

// ////////////////    TIMER
//   $scope.increment = function() {
//     this.input.time++;
//     // angular calls $digest() implicitly because $watch detects change
//   };
//
//   input.startTime = function() {
//     timePromise = $interval(function(){$scope.increment(); }, 1000);
//   };
//
//   this.stopTime = function() {
//     $interval.cancel(timePromise);
//   };
//
//
};

angular
  .module('app')
  .controller('InputCtrl', InputCtrl);
