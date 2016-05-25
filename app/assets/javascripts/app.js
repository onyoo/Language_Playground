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
      .state('typing', {
        url: '/documents/typing/:id',
        templateUrl: 'jsApp/templates/typing.html',
        controller: 'TypingCtrl as typing',
        resolve: {
          documentPromise: function(docService, $stateParams){
            return docService.getDoc($stateParams.id);
          }
        }
      })
      .state('speaking', {
        url: '/documents/speaking/:id',
        templateUrl: 'jsApp/templates/speaking.html',
        controller: 'SpeakingCtrl as speaking',
        resolve: {
          documentPromise: function(docService, $stateParams){
            return docService.getDoc($stateParams.id);
          }
        }
      })
      .state('quiz', {
        url: '/documents/quiz/:id',
        templateUrl: 'jsApp/templates/quiz.html',
        controller: 'QuizCtrl as quiz',
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
