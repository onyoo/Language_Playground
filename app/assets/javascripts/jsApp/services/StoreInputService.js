function StoreInputService() {
  var inputArray = [];

  inputArray.addWord = function(word, status) {
    if(status === 'match'){
      return inputArray.push({n: word, e:status});
    }else{
      return inputArray.push({n: word, e:status});
    };
  };

  inputArray.formatAndAddWord = function(ctrl, input) {
    if(ctrl.docArr[ctrl.count] !== input.body) {
      inputArray.addWord(input.body, 'no_match');
    }else{
      inputArray.addWord(input.body, 'match');
    };
  }

  return inputArray;
}

angular
  .module('app')
  .service('storeInputService', StoreInputService)
