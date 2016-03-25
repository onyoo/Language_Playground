angular
  .module('app', ['ui.router', 'templates'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('document', {
        url: '/document/:id',
        templateUrl: 'app/views/layouts/document.html',
        controller: 'MainCtrl',
        resolve: {
          document: function($http, $stateParams){
            return $http.get('http://localhost:3000/documents/' + $stateParams.id)
          }
        }
      })
      $urlRouterProvider.otherwise('home');
  })
