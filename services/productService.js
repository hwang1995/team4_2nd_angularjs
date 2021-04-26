angular
  .module("app")
  .factory("productService", function($http) {
    const BASE_URL = "http://localhost:8080/api/products";

    return {
      getProductList : function (pageNo, subcategoryId){
        let sendURL = "";
        if(pageNo && !subcategoryId){
          sendURL = `${BASE_URL}?pageNo=${pageNo}`;
        } else if(!pageNo && subcategoryId){
          sendURL = `${BASE_URL}?subcategoryId=${subcategoryId}`;
        } else {
          sendURL = `${BASE_URL}?pageNo=${pageNo}&subcategoryId=${subcategoryId}`;
        }
        return $http.get(sendURL);
      },
      getProductDetails : function(productId) {
        return $http.get(BASE_URL + "/" + productId);
      },
      getCategoryList : function () {
        return $http.get(BASE_URL + "/categories");
      },
      uploadMainImage : async function (formData) {
        let uploadImage = await $http.post(`${BASE_URL}/upload/main`, formData, {headers : {"Content-Type" : undefined}});
        return uploadImage.data.product_image;
      },
      uploadImages : async function (data) {
        return $http.post(`${BASE_URL}/upload`, data);
      },
      getSequence : async function () {
        let sequence = await $http.get(`${BASE_URL}/sequence`);
        return sequence.data.product_id;
      },
      postProducts : async function(data) {
        return $http.post(BASE_URL, data);
      },
      updateProduct : function(data) {
        return $http.put(BASE_URL, data);
      },
      deleteProduct : function(product_id) {
        return $http.put(BASE_URL + "/" + product_id);
      }
    }

  });