angular
  .module('app', ['ui.router', 'templates', "d3"])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/home',
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
        controller: 'InputCtrl as input',
        resolve: {
          documentPromise: function(docService, $stateParams){
            return docService.getDoc($stateParams.id);
          }
        }
      })
      .state('d3', {
        url: '/d3',
        templateUrl: 'jsApp/templates/d3.html',
        controller: 'D3Controller as d3'
      })
      $urlRouterProvider.otherwise('home');
  });
