function MainCtrl (docService, userService) {
  var ctrl = this;
  ctrl.documents = docService.documents;
  ctrl.document = docService.document;
  ctrl.userDocs = docService.userDocs;
  ctrl.search = '';
  ctrl.user = userService.user;

  docService.getMyDocs();
  userService.currentUser();

  ctrl.submitNewForm = function() {
    docService.submitNewDoc(this);
    ctrl.title = '';
    ctrl.body = '';
    ctrl.author = '';
  };

  ctrl.deleteDoc = function(id) {
    docService.deleteDoc(id);
  };

  ctrl.addDoc = function(id) {
    docService.addDoc(id).then(function(resp){
    });
  };

  ctrl.removeMyDoc = function(id) {
    docService.removeMyDoc(id);
  };

};

angular
  .module('app')
  .controller('MainCtrl', MainCtrl);
