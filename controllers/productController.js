angular
  .module("app")
  .controller("productController", function($scope, $rootScope, productService, $location, $routeParams){
    $scope.$on("$routeChangeSuccess", function() {
     
      if($location.path() == "/admin/product/add"){
        productService
          .getCategoryList()
          .then((response) => {
          $scope.categoryName = "Top";

          $scope.category = response.data;
          })
        console.log("Add page gogo")
      } else if($location.path() !== "/admin/product"){
        
        $rootScope.productCtrl_ID = $routeParams.product_id;
        // console.log($routeParams.product_id);
        productService
        .getProductDetails($routeParams.product_id)
        .then((response) => {
          $scope.productInfo = response.data;
          console.log($scope.productInfo)
          $scope.productContents = response.data.product_content.split("\\n\n");
          $scope.productSubContents = response.data.product_subcontent.split("\\n\n");
        })
        ;
      }
      
      $scope.getList(1);
      $scope.triggerEnabled = false;
    });
    


    $scope.goReadPage = (product_id) => {
      const pathLocation = $location.path() + "/" + product_id;
      $location.path(pathLocation)
    }

    $scope.goProductPage = () => {
      $location.path("/admin/product")
    }
    $scope.showCategory = (categoryId) => {
      $scope.categoryList = [
        "Outer - Jacket", "Outer - Coat", "Outer - Cardigan",
        "Top - Knit", "Top - Shirt", "Top - Tee",
        "Bottom - Pants", "Bottom - Skirt"];
      return $scope.categoryList[categoryId - 1];
    }

    $scope.getImagePath = (path) => {
      const BASE_URL = "http://localhost:8080/image?path=";
      return BASE_URL + path;
    }
    
    $scope.getList = (pageNo) => {
      if($scope.triggerEnabled) {
        productService
        .getProductList(pageNo, $scope.subcategory_id)
        .then((response) => {
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
      } else {
        productService
        .getProductList(pageNo)
        .then((response) => {
          $scope.pager = response.data.pager;
          $scope.category = response.data.category;
          $scope.products = response.data.products;

          $scope.pageRange = [];
          $scope.startPageNo = $scope.pager.startPageNo;
          $scope.endPageNo = $scope.pager.endPageNo;

          for(let i = $scope.startPageNo; i <= $scope.endPageNo; i++){
            $scope.pageRange.push(i);
          }

          $scope.selected = "Top";
          $scope.subcategories = $scope.category[$scope.selected];
          $scope.subcategory_id = $scope.subcategories[0].subcategory_id;

        });
      }

      $scope.changeCategories = (selected) => {
        console.log(selected);
        if(selected === "all"){
          $scope.triggerEnabled = false;
          $scope.getList(1);
        }else {
          $scope.triggerEnabled = true;
          $scope.subcategories = $scope.category[selected];
          $scope.subcategory_id = $scope.subcategories[0].subcategory_id;
          $scope.getList(1, $scope.subcategory_id);
        }
        
      };

      $scope.changeSubcategory = (selected) => {
        $scope.triggerEnabled = true;
        $scope.subcategory_id = selected;
        console.log($scope.subcategory_id);
        $scope.getList(1, $scope.subcategory_id);
      }


      $scope.add_Categories = (selected) => {
        $scope.subcategories = $scope.category[selected.trim()];
        $scope.subcategory_id = $scope.subcategories[0].subcategory_id;
      }
      $scope.add_Subcategories = (selected) => {
        $scope.subcategory_id = selected;
      }

      $scope.addItem = async (item) => {
        const INSERT_ENTER_SYMBOL ="\\n\n";
        const ENTER_SYMBOL = /\n/;

        
        // 이미지 가져오기
        let mainImageEl = document.querySelector('#mainImage').files;
        let carouselImageEl = document.querySelector("#carouselImage").files;
        let detailImageEl = document.querySelector('#detailImage').files;

        if(mainImageEl.length < 1 || carouselImageEl.length < 1 || detailImageEl.length < 1 ){
          alert("이미지 업로드 하세요.")
          return;
        } 

        if(item && item.sizes && item.colors && item.product_price && item.product_name && item.content && item.subcontent){
            // 1차적으로 메인 이미지를 업로드하고, 주소를 얻어온다.
             let formData = new FormData();
             formData.append("uploadFile", mainImageEl[0]);
             try {
              let product_image = await productService.uploadMainImage(formData);
              let product_id = await productService.getSequence();

              let sendData = {
                "products" : {
                  product_id,
                  "product_name" : item.product_name,
                  "product_price" : item.product_price,
                  "product_content" : item.content.replace(ENTER_SYMBOL, INSERT_ENTER_SYMBOL),
                  "product_subcontent" : item.subcontent.replace(ENTER_SYMBOL, INSERT_ENTER_SYMBOL),
                  product_image,
                  "subcategory_id" : $scope.subcategory_id
                },
                "sizes" : item.sizes.split(","),
                "colors" : item.colors.split(",")
              }

              await productService.postProducts(sendData);

              for(let file of carouselImageEl){
                const base64Data = await toBase64(file);
                let data = {
                  "type" : "carousel",
                  "filename" : getUUID() + ".jpg",
                  "product_id" : product_id,
                  "base64" : base64Data
                };
                await productService.uploadImages(data);
              }

              for(let file of detailImageEl) {
                const base64Data = await toBase64(file);
                let data = {
                  "type" : "detail",
                  "filename" : getUUID() + ".jpg",
                  "product_id" : product_id,
                  "base64" : base64Data
                };
                await productService.uploadImages(data);
              }

              alert("성공적으로 업로드 되었습니다. 상품 상세 페이지로 이동합니다.");
              $location.url("/admin/product/" + product_id);
             } catch (error) {
               console.log(error);
             }

             
        } else {
          alert("item이 없나요?")
        }

      };
    

      // Image Function
      const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

      // UUID

      const getUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 3 | 8);
          return v.toString(16);
        });
      };


    }
  });

