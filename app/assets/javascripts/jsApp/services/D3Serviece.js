angular
  .module('d3', [])
  .factory('d3Factory', ['$q', function($q) {
  return {
    d3: function() { return window.d3; }
  };
}]);
