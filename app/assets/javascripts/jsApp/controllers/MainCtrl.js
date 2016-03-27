function MainCtrl (docService) {

  this.documents = docService.documents;
  this.document = docService.document;
  this.search = '';

  this.submitNewForm = function(){
    docService.submitNewDoc(this);
  };

}

angular
  .module('app')
  .controller('MainCtrl', MainCtrl);
