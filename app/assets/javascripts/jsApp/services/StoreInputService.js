function StoreInputService() {
  var inputArray = []

  inputArray.addWord = function(word, status) {
    if(status === 'match'){
      return inputArray.push({n: word, e:'match'});
    }else{
      return inputArray.push({n: word, e:'no_match'});
    }
  }
  return inputArray;
}

angular
  .module('app')
  .service('storeInputService', StoreInputService)
