function InputCtrl(storeInputService, docService, $interval, $scope) {
  var input     = this;
  var percent   = 0;
  var timePromise;
  this.body     = '';
  this.count    = 0;
  this.inputArr = storeInputService;
  this.docArr   = docService.document.body.split(' ');
  this.time     = 0;
  this.percentCorrect = percent;

  this.appendWord = function(input) {
    storeInputService.formatAndAddWord(this, input)
    this.inputArr.length === this.docArr.length ? this.endSession() : null;
    this.count += 1;
    input.body = '';
  };

  this.endSession = function() {
    this.stopTime();
    var correct = 0;
    angular.forEach(this.inputArr, function(word){
        correct += (word.e === 'match')  ? 1 : 0;
    });
    this.percentCorrect = Math.floor(correct/this.inputArr.length * 100, -1);
  };

////////////////    TIMER
  $scope.increment = function() {
    this.input.time++;
    // angular calls $digest() implicitly because $watch detects change
  };

  input.startTime = function() {
    timePromise = $interval(function(){$scope.increment(); }, 1000);
  };

  this.stopTime = function() {
    $interval.cancel(timePromise);
  };

  Number.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // radix = Base counting system. Specify 10 for normal.
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
  };
};

angular
  .module('app')
  .controller('InputCtrl', InputCtrl);
