angular
  .module('app', ['ui.router', 'templates'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'jsApp/templates/home.html',
        controller: 'MainCtrl',
        resolve: {
          documentsPromise: function(docService){
            return docService.getAll();
          }
        }
      })
      .state('new_doc', {
        url: '/documents/new',
        templateUrl: 'jsApp/templates/newDoc.html',
        controller: 'MainCtrl',
        resolve: {
          newDocPromise: function(docService){
            return docService.newDoc();
          }
        }
      })
      .state('document', {
        url: '/documents/:id',
        templateUrl: 'jsApp/templates/document.html',
        controller: function($scope, $stateParams) {
          $scope.id = $stateParams.id;
        },
        resolve: {
          documentPromise: function(docService, $stateParams){
            return docService.getDoc($stateParams.id);
          }
        }
      })
      // .state('create_doc', {
      //   url: '/documents',
      //   method: 'POST',
      //
      // });
      // $urlRouterProvider.otherwise('home');
  });
