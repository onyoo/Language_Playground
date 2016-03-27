function InputCtrl(storeInputService, docService, $interval, $scope) {
  var input = this;
  this.body = '';
  this.count = 0;
  this.inputArr = storeInputService;
  this.doc = docService.document.body.split(' ');
  this.time = 0

  this.appendWord = function($event, input) {
    if(this.doc[this.count] !== input.body) {
      storeInputService.addWord(input.body, 'no_match');
    }else{
      storeInputService.addWord(input.body, 'match');
    };
    this.count += 1;
    input.body = '';
  }

  $scope.call = function() {
    this.input.time++;
    // angular calls $digest() implicitly because $watch detects change
  }

  $interval(function(){$scope.call(); }, 1000);

// from http://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss#answer-6313008
  Number.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // radix = Specify 10 for the decimal numeral system commonly used by humans.
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
  }

}
angular
  .module('app')
  .controller('InputCtrl', InputCtrl);
