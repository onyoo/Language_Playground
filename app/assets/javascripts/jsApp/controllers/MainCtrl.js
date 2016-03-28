function MainCtrl (docService) {

  this.documents = docService.documents;
  this.document = docService.document;
  this.userDocs = docService.userDocs;
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

  this.getMyDocs = function() {
    docService.getMyDocs();
  };

  this.removeMyDoc = function(id) {
    docService.removeMyDoc(id);
  }

};

angular
  .module('app')
  .controller('MainCtrl', MainCtrl);
