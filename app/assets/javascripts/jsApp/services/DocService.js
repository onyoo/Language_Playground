function DocService($http, $q, $stateParams) {
  var doc = {
    documents: [],
    document: {}
  };

  doc.getAll = function() {
    return $http.get('/documents.json').success(function(data) {
      angular.copy(data, doc.documents);
    });
  }

  // $q is a promise to do later
  // var deferred = $q.defer();
  // $http.get('http://localhost:3000/documents/' + $stateParams.id).then(function(data){
  //   deferred.resolve(data);
  // });
  // this.getDoc = function() {
  //   return deferred.promise;
  // }

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

  // ,
  // resolve: {
  //   document: function($http, $stateParams){
  //     return $http.get('http://localhost:3000/documents/' + $stateParams.id)
  //   }
  // }
