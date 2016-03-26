function MainCtrl (docService, $rootScope, $filter, $stateParams) {

  this.documents = docService;
  // this.document = docService[$rootScope.$id];
  this.id = $stateParams.id

  this.getDocs = function(){
    docService.getAll();
  }

}

angular
  .module('app')
  .controller('MainCtrl', MainCtrl)
