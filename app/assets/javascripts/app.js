angular
  .module('app', ['ui.router', 'templates', "d3", 'dndLists'])
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
        url: '/documents/show/:id',
        templateUrl: 'jsApp/templates/document.html',
        controller: 'DocumentCtrl as document',
        resolve: {
          documentPromise: function(docService, $stateParams){
            return docService.getDoc($stateParams.id);
          }
        }
      })
      .state('document.typing', {
        url: '/documents/typing/:id',
        templateUrl: 'jsApp/templates/typing.html',
        controller: 'TypingCtrl as typing',
        resolve: {
          documentPromise: function(docService, $stateParams){
            return docService.getDoc($stateParams.id);
          }
        }
      })
      .state('document.speaking', {
        url: '/documents/speaking/:id',
        templateUrl: 'jsApp/templates/speaking.html',
        controller: 'SpeakingCtrl as speaking',
        resolve: {
          documentPromise: function(docService, $stateParams){
            return docService.getDoc($stateParams.id);
          }
        }
      })
      .state('document.quiz', {
        url: '/documents/quiz/:id',
        templateUrl: 'jsApp/templates/quiz.html',
        controller: 'QuizCtrl as quiz',
        resolve: {
          documentPromise: function(docService, $stateParams){
            return docService.getDoc($stateParams.id);
          }
        }
      })
      // .state('d3', {
      //   url: '/d3',
      //   templateUrl: 'jsApp/templates/d3.html',
      //   controller: 'D3Controller as d3'
      // })
      $urlRouterProvider.otherwise('home');
  });
