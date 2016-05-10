function UserService ($http) {
  var user = {
    user: {}
  };

  user.currentUser = function() {
    $http.get('/users/current/user').then(function(resp) {
      angular.copy(resp.data, user.user);
    });
  };

  return user;

};

angular
  .module('app')
  .service('userService', UserService);
