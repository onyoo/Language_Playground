function MainCtrl (docService) {

  this.documents = docService.documents;
  this.document = docService.document;
  this.search = '';


  this.getDocs = function(){
    docService.getAll();
  }

}

angular
  .module('app')
  .controller('MainCtrl', MainCtrl)
