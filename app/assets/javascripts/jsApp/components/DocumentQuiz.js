var DocumentQuiz = {
  templateUrl: 'jsApp/templates/quiz.html',
  bindings: {
    data: '='
  },
  controller: function($scope, docService, storeInputService) {
    var ctrl             = this;
    var percent          = 0;

    ctrl.docArr          = docService.documentArr;
    ctrl.percentCorrect  = percent;
    ctrl.docId           = docService.document.id;
    ctrl.currentDocScore = docService.currentDocScore;

    $scope.models = {
      selected: null
    }

    //creates collumns for quiz board
    function createCollumns(arr, size) {
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
        newArr.push(arr.slice(i, i+size));
      };
      newArr.splice(0,0,[]);
      return newArr;
    };

    ctrl.columnQuizData = createCollumns(ctrl.docArr, ctrl.docArr.length/4);

    ctrl.formArray = [];

  },
  controllerAs: 'quiz'

}

angular
  .module('app')
  .component('documentQuiz', DocumentQuiz);
