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

};

angular
  .module('app')
  .controller('DocumentCtrl', DocumentCtrl);
