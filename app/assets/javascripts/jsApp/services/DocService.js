function DocService($http, $stateParams, $state) {
  var doc = {
    documents: [],
    document: {},
    documentArr: [],
    userDocs: []
  };

  doc.getAll = function() {
    return $http.get('/documents.json').success(function(data) {
      angular.copy(data, doc.documents);
    });
  };

  doc.getDoc = function(id) {
    return $http.get('/documents/' + id).success(function(data) {
      var newArray = [];
      var oldArray = data.body.replace(/[\n\r]/g, ' ').split(' ');
      for(i=0; i < oldArray.length; i++) {
        if(oldArray[i] != "") {
          newArray.push(oldArray[i]);
        }
      }

      angular.copy(data, doc.document);
      angular.copy(newArray, doc.documentArr);
    });
  };

  doc.newDoc = function() {
    return $http.get('/documents/new').success(function(data) {
      angular.copy(data, doc.document);
    });
  };

  doc.submitNewDoc = function(form) {
    // replaces all double quotes
    body = form.body.replace(/["“”’‘]/g, "'" );
    body = body.replace('—', '-');
    // body = body.replace('\n', '');
    data = { author: form.author, body: body, title: form.title };

    return $http.post('/documents.json', data).success(function(data) {
      angular.copy(data, doc.document);
      $state.go('document', {id: doc.document.id});
    });
  };

  doc.deleteDoc = function(id) {
    return $http.delete('/documents/' + id).success(function(id) {
      // add failure handling
    })
  };

  doc.addDoc = function(id) {
    return $http.patch('/documents/' + id).success(function(addedDoc) {
      angular.copy(addedDoc, doc.userDocs);
    });
  };

  doc.removeMyDoc = function(id) {
    return $http.delete('/user_docs/' + id).success(function(resp) {
      // add failure handling
    });
  };

  doc.getMyDocs = function() {
    return $http.get('/users/current_paceholder').success(function(userDocs) {
      angular.copy(userDocs, doc.userDocs);
    });
  };

  return doc;
};

angular
  .module('app')
  .service('docService', DocService);
