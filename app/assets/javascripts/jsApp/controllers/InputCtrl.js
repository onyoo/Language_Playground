function InputCtrl($scope, storeInputService, docService) {
  var input = this;
  this.body = '';
  this.count = 0;
  this.inputArr = storeInputService;
  this.doc = docService.document.body.split(' ');

  this.appendWord = function($event, input) {
    storeInputService.addWord(input.body.split(' ').pop());
    if(this.doc[this.count] !== input.body) {
      console.log("no match")
    }else{
      console.log("match")
    };
    this.count += 1;
    input.body = '';
  }

}
angular
  .module('app')
  .controller('InputCtrl', InputCtrl);
