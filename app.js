angular
  .module("app", ["ngRoute"])
  .run(function($rootScope, $http) {
    // sessionStorage에 email, authToken이 있는지 확인
    $rootScope.email = sessionStorage.getItem("email");
    $rootScope.authToken = sessionStorage.getItem("authToken");

    // $rootScope.authToken의 값이 변경될 떄에 헤더를 넣을지 안넣을지 확인
    $rootScope.$watch("authToken", (newValue) => {
      if(newValue){
        // 로그인 시에 넣어도 된다.
        $http.defaults.headers.common.authToken = newValue;
      } else {
        // 로그아웃 시에 넣어도 된다.
        delete $http.defaults.headers.common.authToken;
      }

    });
  })
  .controller("mainController", function($scope, $location, $route, authService, $window, $rootScope, $location) {
    // 로그인 처리
    $scope.login = (user) => {
      authService
        .login(user)
        .then((response) => {
          console.log(response);
          $rootScope.email = response.data.email;
          $rootScope.authToken = response.data.authToken;

          sessionStorage.setItem("email", response.data.email);
          sessionStorage.setItem("authToken", response.data.authToken);

          $location.url("/admin");
        })
        .catch((response) => {
          $window.alert("로그인에 실패하였습니다.");
          console.log(response);
        });
    }
    $scope.reloadable = (path) => {
      if($location.url().includes(path)){
        $route.reload();
      }
    }
  });