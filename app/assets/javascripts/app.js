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
      });
      $urlRouterProvider.otherwise('home');
  })
