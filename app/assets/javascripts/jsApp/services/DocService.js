function DocService($http, $stateParams, $state) {
  var doc = {
    documents: [],
    document: {},
    documentArr: [],
    currentDocScore: {},
    userDocs: []
  };

  doc.getAll = function() {
    return $http.get('/documents.json').success(function(resp) {
      var data = resp.documents;
      angular.copy(data, doc.documents);
    });
  };

  doc.getDoc = function(id) {
    return $http.get('/documents/' + id).success(function(resp) {

      var data = resp.documents[0];
      var newArray = [];
      var oldArray = data.body.replace(/[\n\r]/g, ' ').split(' ');
      for(i=0; i < oldArray.length; i++) {
        if(oldArray[i] != "") {
          newArray.push(oldArray[i]);
        }
      }

      angular.copy(data, doc.document);
      angular.copy(resp.documents[1], doc.currentDocScore);
      angular.copy(newArray, doc.documentArr);
    });
  };

  doc.newDoc = function() {
    return $http.get('/documents/new').success(function(resp) {
      angular.copy(resp.data, doc.document);
    });
  };

  doc.submitNewDoc = function(form) {
    // replaces all double quotes
    body = form.body.replace(/["“”’‘]/g, "'" );
    body = body.replace('—', '-');
    // body = body.replace('\n', '');
    data = { author: form.author, body: body, title: form.title };

    return $http.post('/documents.json', data).success(function(resp) {
      angular.copy(resp.document, doc.document);
      $state.go('document', {id: doc.document.id});
    });
  };

  doc.deleteDoc = function(id) {
    return $http.delete('/documents/' + id).then(function(resp) {
      angular.forEach(doc.documents, function(document, index) {
        if(document.id === id) {
          delete doc.documents[index];
        };
      });
    }, function(error) {
      console.log(error);
    })
  };

  doc.addDoc = function(id) {
    return $http.patch('/documents/' + id).success(function(resp) {
      doc.userDocs.push(resp.document);
    });
  };

  doc.removeMyDoc = function(id) {
    return $http.delete('/user_docs/' + id).success(function(resp) {
      // add failure handling
    });
  };

  doc.getMyDocs = function() {
    return $http.get('/users/current_paceholder').success(function(resp) {
      angular.copy(resp.users, doc.userDocs);
    });
  };

  doc.updateScore = function(id, percent, time) {
    var data = {
      'user_doc': {
        'accuracy': percent,
        'best_time': time.toHHMMSS()
      }
    };

    return $http.patch('/user_docs/' + id, data).then(function(resp) {
      angular.copy(resp.data.user_doc, doc.currentDocScore);
    }, function(error) {
      console.log(error);
    });
  }

  return doc;
};

angular
  .module('app')
  .service('docService', DocService);
