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
      var ctrl = this;
      ctrl.time = 0,
      ctrl.status = 'START'
    },
    controllerAs: 'timeDir',
    link: function(scope, element, attrs, timeDir) { // ngModel used for $parsers / $formatters
      var timePromise;

      // listens for 'sessionEnded' event from inputCtrl to stop stop time
      $rootScope.$on('sessionEnded', function () {
        timeDir.status = "STOP";
        timeDir.startStop();
      });

      $rootScope.$on('startSession', function () {
        timeDir.status = "START";
        timeDir.startStop();
      });

      $rootScope.$on('restartSession', function () {
        $interval.cancel(timePromise);
        timeDir.time = 0;
        timeDir.status = 'START';
        $rootScope.$broadcast('timeAvailable', timeDir.time);
      });

      timeDir.startStop = function() {
        if(this.status === 'START'){
          timePromise = $interval(function(){timeDir.increment(); }, 1000);
          timeDir.status = 'STOP';
        }else{
          $interval.cancel(timePromise);
          timeDir.status = 'START';
          $rootScope.$broadcast('timeAvailable', timeDir.time);
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
