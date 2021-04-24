angular
  .module("app")
  .controller("memberController", function($scope, $rootScope, memberService, $location, $route){
  $scope.$on("$routeChangeSuccess", () => {
    if($location.url() === "/admin/member/modify"){
      if($rootScope.member == null){
        alert("비정상적인 경로로 접근하셨습니다.");
        $location.url("/admin/member");
      }
    }
      $scope.getList(1);
  });
  $scope.view = "list";
  $scope.getView = () => {
    switch($scope.view) {
      case "list" : return "views/member/list.html";
    }
  };
  $scope.getList = (pageNo) => {
    memberService.list(pageNo)
      .then((response) => {
          $scope.pager = response.data.pager;
          $scope.members = response.data.list;
          console.log(response.data.list);
          $scope.pageRange = [];
          for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++) {
              $scope.pageRange.push(i);
          }
          console.log($scope.pager.endPageNo);
          $scope.view = "list";
      });
  };

  $scope.search = {
    email: "",
    name: ""
  };

  $scope.getSearchList = (pageNo, search) => {
    memberService.list(pageNo, search.email, search.name)
      .then((response) => {
          $scope.pager = response.data.pager;
          $scope.members = response.data.list;
          $scope.pageRange = [];
          if($scope.pager.totalRows == 0) {
            $scope.pager.endPageNo = 1;
          }
          for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++) {
              $scope.pageRange.push(i);
          }
          $scope.view = "list";
      });
  };
  $scope.modifyForm = (member) => {
    $rootScope.member = member;
    $location.url("/admin/member/modify");
  };
  $scope.cancel = () => {
    $location.url("/admin/member");
  };
  $scope.modify = (member) => {
      const telRegExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;

      const nameElem = $("#modifiedName").val();
      const telElem = $("#modifiedTel").val();
      const addressElem = $("#modifiedAddress").val();
      
      if(!nameElem){
        alert("이름을 입력해주세요.");
        return;
      }
      if(!telElem){
        alert("전화번호를 입력해주세요.");
        return;
      } else if(!telRegExp.test(telElem)){
        alert("전화번호 형식이 올바르지 않습니다.");
        return;
      }
      if(!addressElem){
        alert("주소를 입력해주세요.");
        return;
      }

    memberService.modify(member)
    .then((response) => {
      $location.url("/admin/member");
    });
  };
  $scope.deleteMember = (member_id) => {
    memberService.delete(member_id)
    .then((response) => {
      alert("삭제되었습니다.");
      $route.reload();
    });
  };
  $scope.select_change = () => {
    $scope.search.email = "";
    $scope.search.name = "";
  };
});