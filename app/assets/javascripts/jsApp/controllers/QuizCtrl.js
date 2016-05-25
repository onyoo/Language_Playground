function QuizCtrl() {

  var ctrl = this;

  ctrl.docArr = ["this ", "is ","only ","a ","test!"]

  function chunk(arr, size) {
    var newArr = [];
    for (var i=0; i<arr.length; i+=size) {
      newArr.push(arr.slice(i, i+size));
    }
    return newArr;
  }

  ctrl.chunkedData = chunk(ctrl.docArr, ctrl.docArr.length/3);

};

angular
  .module('app')
  .controller('QuizCtrl', QuizCtrl);
