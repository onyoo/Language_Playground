function MainCtrl (docService, $rootScope, $filter, $stateParams) {

  this.documents = docService;

  this.getDocs = function(){
    docService.getAll();
  }

}

angular
  .module('app')
  .controller('MainCtrl', MainCtrl)
