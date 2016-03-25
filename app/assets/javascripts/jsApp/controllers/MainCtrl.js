function MainCtrl (docService, $rootScope) {
  
  this.documents = docService;
  this.getDocs = function(){
    docService.getAll();
  }
}

angular
  .module('app')
  .controller('MainCtrl', MainCtrl)
