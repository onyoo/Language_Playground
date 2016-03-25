function StoreInputService() {
  var inputArray = []

  inputArray.addWord = function(word) {
    return inputArray.push(word);
  }
  return inputArray;
}

angular
  .module('app')
  .service('storeInputService', StoreInputService)
