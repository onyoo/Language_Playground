function timeDirective($interval, $rootScope) {
  return {
    template: [
      "<p>Input timer:</p> {{timeDir.time.toHHMMSS()}}",
      "<br>",
      "<button ng-click='timeDir.startStop()'>",
        "{{timeDir.status}}",
      "</button>"
    ].join(''),
    scope: {},
    require: 'timeDirective',
    controller: function($scope) {
      this.time = 0,
      this.status = 'START'
    },
    controllerAs: 'timeDir',
    link: function(scope, element, attrs, timeDir) { // ngModel used for $parsers / $formatters

      // listens for 'sessionEnded' event from inputCtrl to stop stop time
      $rootScope.$on('sessionEnded', function () {
        this.status = "STOP";
        timeDir.startStop();
      });

      $rootScope.$on('startSession', function () {
        this.status = "START";
        timeDir.startStop();
      });

      timeDir.startStop = function() {
        if(this.status === 'START'){
          timePromise = $interval(function(){timeDir.increment(); }, 1000);
          this.status = 'STOP'
        }else{
          $interval.cancel(timePromise)
          this.status = 'START'
        };
      };

      timeDir.increment = function() {
        timeDir.time++;
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
    }
  };
};

angular
  .module('app')
  .directive('timeDirective', timeDirective)
