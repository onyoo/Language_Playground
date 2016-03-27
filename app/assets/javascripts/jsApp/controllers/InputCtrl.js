function InputCtrl(storeInputService, docService) {
  var input = this;
  this.body = '';
  this.count = 0;
  this.inputArr = storeInputService;
  this.doc = docService.document.body.split(' ');

  this.appendWord = function($event, input) {
    if(this.doc[this.count] !== input.body) {
      storeInputService.addWord(input.body, 'no match');
    }else{
      storeInputService.addWord(input.body, 'match');
    };
    this.count += 1;
    input.body = '';
  }

}
angular
  .module('app')
  .controller('InputCtrl', InputCtrl);
