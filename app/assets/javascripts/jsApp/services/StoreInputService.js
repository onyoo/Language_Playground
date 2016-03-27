function StoreInputService() {
  var inputArray = [];

  inputArray.addWord = function(word, status) {
    if(status === 'match'){
      return inputArray.push({n: word, e:status});
    }else{
      return inputArray.push({n: word, e:status});
    }
  }
  return inputArray;
}

angular
  .module('app')
  .service('storeInputService', StoreInputService)
