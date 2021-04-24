angular
  .module("app")
  .factory("orderService", function($http) {
    const BASE_URL = "http://localhost:8080/api/orders";
    
    return {
      list: function(pageNo=1, orderId, delivery) {
        if((orderId === null && delivery === null)||(orderId === undefined && delivery === undefined)){
          //전체주문
          const promise = $http.get(BASE_URL + "?pageNo=" + pageNo, {params:{pageNo}});
          return promise;
        } else if(delivery === null) {
          //주문번호로 검색
          const promise = $http.get(BASE_URL + "?pageNo=" + pageNo + "&orderId=" + orderId , {params:{pageNo}});
          return promise;
        } else {
          //배송상태로 검색
          const promise = $http.get(BASE_URL + "?pageNo=" + pageNo + "&delivery=" + delivery, {params:{pageNo}});
          return promise;
        }
      },
      read: function(orderId) {
        const promise = $http.get(BASE_URL + "/" + orderId);
        return promise;
      },
      modify: function(order) {
        const promise = $http.put(BASE_URL, order);
        return promise;
      }
    }
  });