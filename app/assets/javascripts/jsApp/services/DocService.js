function DocService($http) {
  var documents = []

  documents.getAll = function() {
    return $http.get('/documents.json').success(function(data) {
      angular.copy(data, documents);
    });
  }

  return documents;
}

angular
  .module('app')
  .service('docService', DocService)
