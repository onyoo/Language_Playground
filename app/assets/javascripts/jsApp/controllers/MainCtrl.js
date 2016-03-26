function MainCtrl (docService, $rootScope, $filter, $stateParams, $scope, $interval) {

  this.documents = docService.documents;
  this.document = docService.document;
  this.search = '';


  this.getDocs = function(){
    docService.getAll();
  }
  var scope = this;


}

angular
  .module('app')
  .controller('MainCtrl', MainCtrl)
