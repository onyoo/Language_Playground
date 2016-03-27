function DocService($http, $stateParams) {
  var doc = {
    documents: [],
    document: {}
  };

  doc.getAll = function() {
    return $http.get('/documents.json').success(function(data) {
      angular.copy(data, doc.documents);
    });
  }

  doc.getDoc = function(id) {
    return $http.get('http://localhost:3000/documents/' + id).success(function(data) {
      angular.copy(data, doc.document);
    });
  };

  return doc;
}

angular
  .module('app')
  .service('docService', DocService)
