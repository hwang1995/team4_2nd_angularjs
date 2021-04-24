angular
  .module("app")
  .factory("qnaService", function($http) {
    const BASE_URL = "http://localhost:8080/api/qna";

    return {
      list: function(pageNo=1) {
        const promise = $http.get(BASE_URL, {params:{pageNo}});
        return promise;
      },
      listBySearch: function(pageNo=1, search) {
        if(search.email != "") {
          const promise = $http.get(BASE_URL + "?member_email=" + search.email, {params:{pageNo}});
          return promise;
        } else if(search.category != "") {
          var category;
          if(search.category == "상품문의") {
            category = "products";
          } else if(search.category == "배송문의") {
            category = "delivery";
          } else if(search.category == "교환문의") {
            category = "exchange";
          } else {
            category = "etc";
          }
          const promise = $http.get(BASE_URL + "?qna_category=" + category, {params:{pageNo}});
          return promise;
        } else if(search.answer != "") {
          const promise = $http.get(BASE_URL + "?qna_answer=" + search.answer, {params:{pageNo}});
          return promise;
        }
      },
      read: function(qna_id) {
          const promise = $http.get(BASE_URL + "/" + qna_id);
          return promise;
      },
      update: function (qna, mail) {
          const promise = $http.put(BASE_URL, qna);
          const emailSend = $http.post("http://localhost:8080/api/mail", mail);
          return promise;
      },
      delete: function (qna_id) {
          const promise = $http.delete(BASE_URL + "/" + qna_id);
          return promise;
      }
    }
  });