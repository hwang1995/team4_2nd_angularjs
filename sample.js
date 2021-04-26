Promise
              .all([uploadImage, getSequence])
              .then((response) => {
                // 받아온 상품 이미지, 상품 번호를 세팅
                const product_image = response[0].data.product_image;
                const product_id = response[1].data.product_id;
                console.log("PROMISE STEP 1 ", product_id, product_image);

                // 상품을 보낼 데이터를 세팅
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
                };

                productService
                  .postProducts(sendData)
                  .then(async (response) => {
                    for(let file of carouselImageEl){
                      const base64Data = await toBase64(file);
                      let data = { 
                        "type" : "carousel",
                        "filename" : getUUID() + ".jpg",
                        "product_id" : product_id,
                        "base64" : base64Data
                      };
                      await productService
                        .uploadImages(data)
                        .then((response) => {
                          console.log(response);
                        })
                    }
                  })
                  .then(async (response) => {
                    for(let file of detailImageEl){
                      const base64Data = await toBase64(file);
                      let data = {
                        "type" : "detail",
                        "filename" : getUUID() + ".jpg",
                        "product_id" : product_id,
                        "base64" : base64Data
                      };
                      await productService
                        .uploadImages(data)
                        .then((response) => {
                          console.log(response);
                        })

                    }
                  })
                  .then((response) => {
                    alert("성공적으로 업로드 되었습니다. 상품 상세 페이지로 이동합니다.");
                    $location.url("/admin/product/" + product_id);
                  });
              })

              // 서비스
              uploadMainImage : function (formData) {
                return $http.post(`${BASE_URL}/upload/main`, formData, {headers : {"Content-Type" : undefined}});
              },
              uploadImages : function (data) {
                return $http.post(`${BASE_URL}/upload`, data);
              },
              getSequence : function () {
                return $http.get(`${BASE_URL}/sequence`);
              },
              postProducts : function(data) {
                return $http.post(BASE_URL, data);
              }