angular
  .module("app")
  .controller("qnaController", function($scope, $rootScope, qnaService, $location){
    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList(1);
    });

    $scope.searchOptions = ["이메일", "분류", "답변상태"];
    $scope.searchOption = "이메일";

    $scope.categorys = ["상품문의", "배송문의", "교환문의", "기타문의"];

    $scope.answers = ["답변중", "답변완료"];

    $scope.view = "list";
    $scope.getView = () => {
        switch($scope.view) {
            case "list": return "views/qna/qna.html";
            case "read": return "views/qna/detail.html";
            case "update": return "views/qna/modify.html";
        }
    };

    $scope.setNull = () => {
      $scope.search = {email:"", category:"", answer:""};
      $scope.search_finished = false;
    };

    $scope.search = {email:"", category:"", answer:""};

    $scope.getList = (pageNo, search) => {
      if(search != null) {
        $scope.search_finished = true;
        qnaService.listBySearch(pageNo, search)
          .then((response) => {
            $scope.pager = response.data.pager;
            $scope.qnas = response.data.qnas;
            $scope.pageRange = [];
            for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++) {
                $scope.pageRange.push(i);
            }
            $scope.view = "list";
          });
      } else {
        qnaService.list(pageNo)
          .then((response) => {
              $scope.pager = response.data.pager;
              $scope.qnas = response.data.qnas;
              $scope.pageRange = [];
              for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++) {
                  $scope.pageRange.push(i);
              }
              $scope.view = "list";
          });
      }
    };

    $scope.read = (qna_id) => {
      qnaService.read(qna_id)
          .then((response) => {
              $scope.qna = response.data;
              $scope.view = "read";
          });
    };

    $scope.updateQnaForm = () => {
      $scope.qna.qna_answer="";
      $scope.view = "update";
    };

    $scope.cancel = (qna_id) => {
      $scope.read(qna_id);
    };

    $scope.updateQna = (qna) => {
      if(qna.qna_answer) {
        $scope.mail = {address: qna.member_email, title: "고객님이 문의하신 Q&A 답변입니다.", message: qna.qna_answer};
        qnaService.update(qna, $scope.mail)
            .then((response) => {
                $scope.read(qna.qna_id);
            });
      }
    };

    $scope.deleteQna = (qna_id) => {
      qnaService.delete(qna_id)
          .then((response) => {
              $scope.getList(1);
          });
    };

    $scope.handleMouseEvent = (event) => {
      if(event.type === "mouseenter") {
          $(event.target).parent("tr").css("background-color", "#e9ecef");
      } else {
          $(event.target).parent("tr").css("background-color", "#ffffff");
      }
    };

    $scope.delete_check = (qna_id) => {
      if (confirm("정말 삭제하시겠습니까??") == true){    //확인
          $scope.deleteQna(qna_id);
      } else{   //취소
          return;
      }
    };

    $scope.customColor = (answer_status) => {
      if(answer_status == "ⓧ") {
        return "#ff6b6b";
      } else {
        return "#20c997";
      }
    };

    $scope.handleMouseEventSearch = (event) => {
      if(event.type === "mouseenter") {
          $(event.target).css("background-color", "#e9ecef");
      } else {
          $(event.target).css("background-color", "#ffffff");
      }
    };

  });