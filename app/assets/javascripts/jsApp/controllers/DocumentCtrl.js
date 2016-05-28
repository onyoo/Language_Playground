function DocumentCtrl(storeInputService, docService, $interval, $scope, $rootScope, $stateParams) {
  var ctrl     = this;
  var percent   = 0;
  ctrl.body     = '';
  ctrl.count    = 0;
  ctrl.inputArr = storeInputService;
  ctrl.docArr   = docService.documentArr;
  ctrl.document = docService.document;
  ctrl.percentCorrect = percent;
  ctrl.docId    = docService.document.id;
  ctrl.currentDocScore = docService.currentDocScore;

};

angular
  .module('app')
  .controller('DocumentCtrl', DocumentCtrl);
