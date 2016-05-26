var DocumentQuiz = {
  templateUrl: 'jsApp/templates/quiz.html',
  bindings: {
    data: '='
  },
  controller: function($scope, docService, storeInputService) {
    var ctrl             = this;
    var percent          = 0;

    ctrl.percentCorrect  = percent;
    ctrl.document        = docService.document;
    ctrl.docArr          = [];
    ctrl.currentDocScore = docService.currentDocScore;

    ctrl.document.body.split('.').forEach(function(string, i){
      if (string.length > 0) {
        ctrl.docArr.push({id: i, string: string+='.'})
      };
    });

    $scope.models = {
      selected: null
    }

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

    ctrl.columnQuizData = createCollumns(ctrl.docArr, ctrl.docArr.length/4);

    $scope.moveToContainer = function(item, index) {
      this.$parent.row.splice(index,1);
      ctrl.columnQuizData[0].push(item);
    };
    $scope.refresh = function() {
      ctrl.columnQuizData = createCollumns(ctrl.docArr, ctrl.docArr.length/4);
    };

  },
  controllerAs: 'quiz'

}

angular
  .module('app')
  .component('documentQuiz', DocumentQuiz);
