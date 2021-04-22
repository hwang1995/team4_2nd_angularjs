angular
  .module("app")
  .factory("authService", function($http) {
    const BASE_URL = "http://localhost:8080/api/auth";

    return {
      login : function(user) {
        const promise = $http.post(BASE_URL + "/login", user);
        return promise;
      }
    }
  });