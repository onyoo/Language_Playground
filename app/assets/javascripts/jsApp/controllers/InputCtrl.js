function InputCtrl($scope, storeInputService) {
  var input = this;
  this.body = '';
  this.count = 0;
  this.inputArr = storeInputService;

  this.appendWord = function($event, input) {
    storeInputService.addWord(input.body.split(' ').pop())
    input.body = '';
  }

  this.clearInput = function() {
    debugger;
  }
}
angular
  .module('app')
  .controller('InputCtrl', InputCtrl);
