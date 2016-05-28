function QuizCtrl($scope, docService, storeInputService) {
  var ctrl             = this;
  ctrl.percentCorrect  = 0;
  ctrl.document        = docService.document;
  ctrl.docArr          = [];

  // creates array of sentence objects
  ctrl.document.body.split('. ').forEach(function(string, i){
    if (string.length > 0) {
      ctrl.docArr.push({id: i, string: string+='.'})
    };
  });

  //creates collumns for quiz board
  function createCollumns(arr, size) {
    var newArr = [];
    for (var i=0; i<arr.length; i+=size) {
      newArr.push(arr.slice(i, i+size));
    };
    //sets receiver column
    newArr.splice(0,0,[]);
    return newArr;
  };

  ctrl.columnQuizData = createCollumns(shuffle(ctrl.docArr), ctrl.docArr.length/4);

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // Checks there are elements to shuffle
    while (currentIndex !== 0) {

      // Picks a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swaps it with the current element
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    };
    return array;
  };

  // moves item to answer on click
  $scope.moveToContainer = function(item, index) {
    this.$parent.column.splice(index,1);
    ctrl.columnQuizData[0].push(item);
  };

  // refreshes quiz
  $scope.refresh = function() {
    ctrl.columnQuizData = createCollumns(ctrl.docArr, ctrl.docArr.length/4);
  };

  $scope.checkAnswer = function() {
    var total = ctrl.docArr.length;
    ctrl.docArr.forEach(function(item, i) {
      if (ctrl.columnQuizData[0][i].id === item.id) {
        ctrl.percentCorrect += 1/total;
      };
      debugger;
    });
    ctrl.percentCorrect *= 100;
  };
};

angular
  .module('app')
  .controller('QuizCtrl', QuizCtrl);
