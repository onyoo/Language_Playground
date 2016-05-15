var DocumentQuiz = {
  templateUrl: 'jsApp/templates/quiz.html',
  bindings: {
    data: '='
  },
  controller: function() {
  },
  controllerAs: 'quiz'
}

angular
  .module('app')
  .component('documentQuiz', DocumentQuiz);
