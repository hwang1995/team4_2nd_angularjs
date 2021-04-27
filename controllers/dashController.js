angular
  .module("app")
  .controller("dashController", function ($scope, dashService) {
    //로딩이 아직 안되었을 때 spinner를 보여주기 위한 scope
    $scope.isLoaded = false;

    //routeChangeSuccess되었을 때, 필요한 값을 가져와서 세팅해줌
    $scope.$on("$routeChangeSuccess", function () {
      dashService
        .getDashboardInfo()
        .then((response) => {
          $scope.totalMembers = response.data.totalMembers;
          $scope.totalQnaFinished = response.data.totalQnaFinished;
          $scope.totalQnaWaiting = response.data.totalQnaWaiting;
          $scope.totalDeliveryFinished = response.data.totalDeliveryFinished;
          $scope.totalDeliveryWaiting = response.data.totalDeliveryWaiting;
          $scope.totalProducts = response.data.totalProducts;
          $scope.chart = response.data.chart;
          $scope.labels = [];
          $scope.data = [];
          $scope.tempData = [];
          $scope.series = ["총매출액"];

          for(let chartInfo of $scope.chart){
            $scope.labels.push(chartInfo.order_date.substring(2,10));
            $scope.tempData.push(chartInfo.sum_price / 10000);
          }
          $scope.data = [$scope.tempData];
          $scope.isLoaded = true;
        })
    });   
  })