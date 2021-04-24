productService
.uploadMainImage(formData)
// 1단계 - 이미지 업로드 하기
.then((response) => {
  let product_image = response.data.product_image;
  let promiseObj = {};
  promiseObj.product_image = product_image;
  console.log("1단계 - 이미지 업로드 성공", response);
  console.log(promiseObj);
  return $q.resolve(promiseObj);
})
// 2단계 - 상품을 추가하기 위해 product_id seq 가져오기
.then((promiseObj) => {
  productService.getSequence()
    .then((response) => {
      console.log("2단계 - 상품 ID 가져오기 성공", response);
      console.log(promiseObj);
      promiseObj.product_id = response.data.product_id;
      return $q.resolve(promiseObj);
    })
  
})
// 3단계 - 가져온 seq로 상품 추가하기
.then((promiseObj) => {
  let sizes = item.sizes.split(",");
  let colors = item.colors.split(",");
  let sendData = {
    "products" : {
      "product_id" : promiseObj.product_id,
      "product_name" : item.product_name,
      "product_price" : item.product_price,
      "product_content" : item.content.replace(ENTER_SYMBOL, INSERT_ENTER_SYMBOL),
      "product_subcontent" : item.subcontent.replace(ENTER_SYMBOL, INSERT_ENTER_SYMBOL),
      "product_image" : promiseObj.product_image,
      "subcategory_id" : $scope.subcategory_id
    }, sizes, colors
  };
  console.log(promiseObj.product_id, promiseObj.product_image);
  console.log(sendData);
  // productService
  //   .postProducts(sendData)
  //   .then((response) => {
  //     console.log("3단계 - 상품 추가 성공", response);
  //   })

  // return $q.resolve(promiseObj);
});
// // 4단계 - 추가한 상품으로 Carousel 이미지 업로드
// .then((promiseObj) => {
//   // FormData 추가하기
//   let formData = new FormData();
//   formData.append("uploadFiles", carouselImageEl[0]);
//   formData.append("type", "carousel");
//   formData.append("product_id", promiseObj.product_id);

//   productService
//     .uploadImages(formData)
//     .then((response) => {
//       console.log("4단계 - Carousel 이미지 업로드 성공", response);
//     })

//   return $q.resolve(promiseObj);
// })
// .then((promiseObj) => {
//   let formData = new FormData();
//   formData.append("uploadFiles", detailImageEl[0]);
//   formData.append("type", "detail");
//   formData.append("product_id", promiseObj.product_id);

//   productService
//     .uploadImages(formData)
//     .then((response) => {
//       console.log("5단계 - Detail 이미지 업로드 성공", response);
//     })
// })
// .then((promiseObj) => {
//   alert("상품 추가에 성공했습니다. 상품 상세 페이지로 이동합니다.");
//   $location.url(`/admin/product/${promiseObj.product_id}`);
// })



// image fileList를 가져다가 blob으로 만들고, 이것을 Spring으로 전달하기
Array
.from(carouselImageEl)
.forEach(async (item) => {
  const base64Data = await toBase64(item);
  let data = {
    "type" : "carousel",
    "filename" : getUUID() + ".jpg",
    "base64" : base64Data
  };
  productService
    .uploadImages(data)
    .then((response) => {
      console.log(response);
    });
});


