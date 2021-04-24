angular.module("app")
  .controller("orderController", function($scope, $rootScope, $location, orderService){
    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList(1);
    });

    $scope.model = {
      orderId: null,
      delivery: null
    }
    $scope.view = "list";
    $scope.getView = () => {
      switch($scope.view) {
        case "list": return "views/order/orderList.html";
        case "read": return "views/order/detail.html";
        case "modify": return "views/order/modify.html";
      }
    };

    $scope.getList = (pageNo) => {
      orderService.list(pageNo)
        .then((response) => {
          $scope.pager = response.data.pager;
          $scope.orders = response.data.orders;
          $scope.pageRange = [];
          for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++) {
            $scope.pageRange.push(i);
          }
          $scope.view = "list";
        });
    };

  $scope.searchListBtn = (pageNo, model) => {
      orderService.list(pageNo, model.orderId, model.delivery)
      .then((response) => {
        $scope.pager = response.data.pager;
        $scope.orders = response.data.orders;
        $scope.pageRange = [];
        for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++) {
          $scope.pageRange.push(i);
        }
        $scope.view = "list";
    });
  };

  $scope.read = (orderId) => {
    orderService.read(orderId)
      .then((response) => {
        $scope.order = response.data.order;
        $scope.member = response.data.member;
        $scope.products = response.data.orderInfoList;
        $scope.totalPrice = response.data.totalPrice;
        $scope.view = "read";
      });
  };

  $scope.modifyForm = () => {
    $scope.view = "modify";
  };

  $scope.modifyOrder = (order) => {
    orderService.modify(order)
      .then((response) => {
        $scope.order = response.data.order;
        $scope.view = "read";
      });
  };

  $scope.searchChange = () => {
      $scope.model.orderId = null;
      $scope.model.delivery = null;
  }

});