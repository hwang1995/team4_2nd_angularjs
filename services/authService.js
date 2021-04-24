angular
  .module("app")
  .factory("authService", function($http) {
    const BASE_URL = "http://localhost:8080/api/auth";

    return {
      login : function(user) {
        const promise = $http.post(BASE_URL + "/login", user);
        return promise;
      },
      register : function(user) {
        const promise = $http.post(BASE_URL + "/register", user);
        return promise;
      },
      existed_email : function(user) {
        const promise = $http.post(BASE_URL + "/existed-email", user);
        return promise;
      }
    }
  });