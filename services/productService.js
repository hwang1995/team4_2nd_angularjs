angular
  .module("app")
  .factory("productService", function($http) {
    const BASE_URL = "http://localhost:8080/api/products";

    return {
      getProductList : function (pageNo, subcategoryId){
        let sendURL = "";
        if(pageNo && !subcategoryId){
          sendURL = `${BASE_URL}?pageNo=${pageNo}`;
          console.log(pageNo);
        } else if(!pageNo && subcategoryId){
          sendURL = `${BASE_URL}?subcategoryId=${subcategoryId}`;
        } else {
          sendURL = `${BASE_URL}?pageNo=${pageNo}&subcategoryId=${subcategoryId}`;
        }
        return $http.get(sendURL);
      },
      getProductDetails : function(productId) {
        return $http.get(BASE_URL + "/" + productId);
      }
    }

  });