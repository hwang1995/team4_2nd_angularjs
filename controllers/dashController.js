angular
  .module("app")
  .controller("dashController", function ($scope, $rootScope, dashService, $timeout) {
    $scope.isLoaded = false;

    $scope.$on("$routeChangeSuccess", function () {
      console.log($scope.isLoaded);
      dashService
        .getDashboardInfo()
        .then((response) => {
          console.log("ROUTE", response.data);
          $scope.totalMembers = response.data.totalMembers;
          $scope.totalQnaFinished = response.data.totalQnaFinished;
          $scope.totalQnaWaiting = response.data.totalQnaWaiting;
          $scope.totalDeliveryFinished = response.data.totalDeliveryFinished;
          $scope.totalDeliveryWaiting = response.data.totalDeliveryWaiting;
          $scope.totalProducts = response.data.totalProducts;
          $scope.chart = response.data.chart;
          $scope.labels = [];
          $scope.data = [];
          $scope.tempData = []
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