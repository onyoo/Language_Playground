function StoreInputService() {
  var inputArray = [];

  // Used in typing exercise
  inputArray.addWord = function(word, status) {
    if(status === 'match'){
      return inputArray.push({n: word, e:status});
    }else{
      return inputArray.push({n: word, e:status});
    };
  };
  // used in speaking exercise
  inputArray.addText = function(ctrl, text) {
    var array = text.split(' ');
    angular.forEach(array, function(val) {
      var input = {}
      input.body = val;
      inputArray.formatAndAddWord(ctrl, input);
      ctrl.count++
    })
  };

  inputArray.clearOut = function() {
    this.splice(0,this.length);
  };

  inputArray.formatAndAddWord = function(ctrl, input) {
    if(ctrl.documentAttrs.docArr[ctrl.count] !== input.body) {
      inputArray.addWord(input.body, 'no_match');
    }else{
      inputArray.addWord(input.body, 'match');
    };
  };

  return inputArray;
}

angular
  .module('app')
  .service('storeInputService', StoreInputService)
