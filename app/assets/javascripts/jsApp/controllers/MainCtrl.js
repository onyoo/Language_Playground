function MainCtrl (docService) {

  this.documents = docService.documents;
  this.document = docService.document;
  this.search = '';

  this.submitNewForm = function() {
    docService.submitNewDoc(this);
    this.title = '';
    this.body = '';
    this.author = '';
  };

  this.deleteDoc = function(id) {
    docService.deleteDoc(id);
  };

  this.addDoc = function(id) {
    docService.addDoc(id);
  };

};

angular
  .module('app')
  .controller('MainCtrl', MainCtrl);
