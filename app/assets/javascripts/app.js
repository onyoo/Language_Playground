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
        // controller: 'MainCtrl',
        controller: function($scope, $stateParams) {
          $scope.id = $stateParams.id;
        },
        resolve: {
          document: function($http, $stateParams){
            return $http.get('http://localhost:3000/documents/' + $stateParams.id)
          }
        }
      });
      $urlRouterProvider.otherwise('home');
  })
