angular
  .module("app")
  .factory("memberService", function($http) {
    const BASE_URL = "http://localhost:8080/api/members";

    return {
      list: function(pageNo=1, email, name) {
        if((email == "" && name =="") || (email === undefined && name === undefined)) {
          const promise = $http.get(BASE_URL + "?pageNo=" + pageNo, {params: {pageNo}});
          return promise;
        }
        else if (name == "") {
          const promise = $http.get(BASE_URL + "?pageNo=" + pageNo + "&email=" + email, {params: {pageNo}});
          return promise;
        }
        else if(email == "") {
          const promise = $http.get(BASE_URL + "?pageNo=" + pageNo + "&name=" + name, {params: {pageNo}});
          return promise;
        }
     },
     modify: function(member) {
      const promise = $http.put(BASE_URL, member);
      return promise;
     },
     delete: function(member_id) {
       const promise = $http.delete(BASE_URL + "/" + member_id);
       return promise;
     }
    }
  });