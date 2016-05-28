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
        url: '/new',
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
        controller: 'DocumentCtrl as document',
        resolve: {
          documentPromise: function(docService, $stateParams){
            return docService.getDoc($stateParams.id);
          }
        },
        abstract: true
      })
      .state('document.reading', {
        url: '/reading',
        templateUrl: 'jsApp/templates/reading.html',
        controller: 'DocumentCtrl as reading'
      })
      .state('document.typing', {
        url: '/typing',
        templateUrl: 'jsApp/templates/typing.html',
        controller: 'TypingCtrl as typing'
      })
      .state('document.speaking', {
        url: '/speaking',
        templateUrl: 'jsApp/templates/speaking.html',
        controller: 'SpeakingCtrl as speaking'
      })
      .state('document.quiz', {
        url: '/quiz',
        templateUrl: 'jsApp/templates/quiz.html',
        controller: 'QuizCtrl as quiz'
      })
      $urlRouterProvider.otherwise('home');
  });
