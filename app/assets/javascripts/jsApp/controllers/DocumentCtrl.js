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
  ctrl.userDoc  = docService.userDoc;

  $rootScope.$on('restartSession', function () {
    storeInputService.clearOut();
  });

  // hides speech input
  if (document.getElementById("skitt-ui")) {
    document.getElementById('skitt-ui').className += ' hidden';
  };

};

angular
  .module('app')
  .controller('DocumentCtrl', DocumentCtrl);
