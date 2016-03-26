angular
  .module('app', ['ui.router', 'templates'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'jsApp/templates/home.html',
        controller: 'MainCtrl',
        resolve: {
          document: function(){return}
        }
      })
      .state('document', {
        url: '/documents/:id',
        templateUrl: 'jsApp/templates/document.html',
        controller: function($scope, $stateParams) {
          $scope.id = $stateParams.id;
        },
        resolve: {
          documentPromise: function(docService, $http, $stateParams){
            return docService.getDoc($stateParams.id);
          }
        }
      });
      $urlRouterProvider.otherwise('home');
  })
