angular
  .module("app")
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {templateUrl : "views/auth/login.html"})
      .when("/admin", {templateUrl : "views/dashboard/index.html"})
      .when("/admin/product", {templateUrl : "views/products/product.html", controller : "productController"})
      .when("/admin/product/add", {templateUrl : "views/products/add.html", controller : "productController"})
      .when("/admin/product/modify", {templateUrl : "views/products/modify.html", controller : "productController"})
      .when("/admin/product/:product_id", {templateUrl : "views/products/detail.html", controller : "productController"})
      .when("/admin/member", {templateUrl : "views/member/member.html", controller : "memberController"})
      .when("/admin/member/add", {templateUrl : "views/member/add.html", controller : "memberController"})
      .when("/admin/member/modify", {templateUrl : "views/member/modify.html", controller : "memberController"})
      .when("/admin/member/:member_id", {templateUrl : "views/member/detail.html", controller : "memberController"})
      .when("/admin/order", {templateUrl : "views/order/order.html", controller : "orderController"})
      .when("/admin/order/:order_id", {templateUrl : "views/order/detail.html", controller : "orderController"})
      .when("/admin/order/modify", {templateUrl : "views/order/modify.html", controller : "orderController"})
      .when("/admin/qna", {templateUrl : "views/qna/qna.html", controller : "qnaController"})
      .when("/admin/qna/add", {templateUrl : "views/qna/add.html", controller : "qnaController"})
      .when("/admin/qna/modify", {templateUrl : "views/qna/modify.html", controller : "qnaController"})
      .when("/admin/qna/:qna_id", {templateUrl : "views/qna/detail.html", controller : "qnaController"})
      .otherwise({redirectTo : "/"})
      ;
  })