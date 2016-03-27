function DocService($http, $stateParams, $state) {
  var doc = {
    documents: [],
    document: {}
  };

  doc.getAll = function() {
    return $http.get('/documents.json').success(function(data) {
      angular.copy(data, doc.documents);
    });
  };

  doc.getDoc = function(id) {
    return $http.get('/documents/' + id).success(function(data) {
      angular.copy(data, doc.document);
    });
  };

  doc.newDoc = function() {
    return $http.get('/documents/new').success(function(data) {
      angular.copy(data, doc.document);
    });
  };

  doc.submitNewDoc = function(form) {
    data = { body: form.body, title: form.title };
    return $http.post('/documents.json', data).success(function(data) {
      angular.copy(data, doc.document);
      $state.go('document', {id: doc.document.id});
    });
  };

  doc.deleteDoc = function(form, id) {
    var self = this;
    return $http.delete('/documents/' + id).success(function(id) {
      // add failure handling
    })
  };

  return doc;
};

angular
  .module('app')
  .service('docService', DocService);
