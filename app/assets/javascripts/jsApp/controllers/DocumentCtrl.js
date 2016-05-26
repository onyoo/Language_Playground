function DocumentCtrl(storeInputService, docService, $interval, $scope, $rootScope, $stateParams) {
  var input     = this;
  var percent   = 0;
  this.body     = '';
  this.count    = 0;
  this.inputArr = storeInputService;
  this.docArr   = docService.documentArr;
  this.percentCorrect = percent;
  this.docId    = docService.document.id;
  this.currentDocScore = docService.currentDocScore;
  var ctrl = this;

  ////////////////////////


  $scope.models = {
          selected: null,
          lists: {"A": [], "B": []}
      };

      // Generate initial model
      for (var i = 1; i <= 3; ++i) {
          $scope.models.lists.A.push({label: "Item A" + i});
          $scope.models.lists.B.push({label: "Item B" + i});
      }
      
      // Model to JSON for demo purpose
      $scope.$watch('models', function(model) {
          $scope.modelAsJson = angular.toJson(model, true);
      }, true);


};

angular
  .module('app')
  .controller('DocumentCtrl', DocumentCtrl);
