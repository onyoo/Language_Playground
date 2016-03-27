function MainCtrl (docService) {

  this.documents = docService.documents;
  this.document = docService.document;
  this.search = '';

}

angular
  .module('app')
  .controller('MainCtrl', MainCtrl)
