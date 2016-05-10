function MainCtrl (docService, $http) {
  var ctrl = this;
  ctrl.documents = docService.documents;
  ctrl.document = docService.document;
  ctrl.userDocs = docService.userDocs;
  ctrl.search = '';

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
      console.log(ctrl.userDocs)
      ctrl.userDocs.push(resp.data);
    });
  };

  // this.getMyDocs = function() {
    docService.getMyDocs();
  // };

  ctrl.removeMyDoc = function(id) {
    docService.removeMyDoc(id);
  };

};

angular
  .module('app')
  .controller('MainCtrl', MainCtrl);
