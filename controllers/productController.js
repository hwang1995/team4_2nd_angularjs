angular
  .module("app")
  .controller("productController", function($scope, $rootScope, productService){
    $scope.$on("$routeChangeSuccess", function() {
      $scope.getList(1);
    });

    $scope.getList = (pageNo, subcategoryId) => {
      console.log(subcategoryId)
      console.log(pageNo);
      productService
        .getProductList(pageNo)
        .then((response) => {
          console.log(response.data.pager);
          console.log(response.data.products);
          $scope.pager = response.data.pager;
          $scope.category = response.data.category;
          $scope.products = response.data.products;

          $scope.pageRange = [];
          $scope.startPageNo = $scope.pager.startPageNo;
          $scope.endPageNo = $scope.pager.endPageNo;

          for(let i = $scope.startPageNo; i <= $scope.endPageNo; i++){
            $scope.pageRange.push(i);
          }
        });
    }
  });