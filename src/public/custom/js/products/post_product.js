let form_data_user_post_product = null;

let message_post_product = {
    image_type_incorrect: "Kiểu file không hợp lệ.",
    image_size_incorrect: "Kích thước file quá lớn, tối đa 50MB",
		information_required: "Bạn cần điền đầy đủ thông tin như ảnh, tên sản phẩm, mô tả, loại sản phẩm.",
		post_product_success: "Đăng bán sản phẩm thành công."
}

function remove_data_in_form(){
    $("#input-name-product").val("");
    $("#input-price-product").val("");
    $("#input-description-product").val("");
    $(".preview-image-product .wrap-content").empty();

    form_data_user_post_product = null;
}

function validation_images(images){
    const accept_type = ['image/jpg','image/png','image/gif', 'image/jpeg']
    let limit = 1048576 * 10;
    let result = true
    
    for(let i = 0; i < images.length ; i++){
        let image = images[i];

        if(!accept_type.includes(image.type)) {
            alertify.error(message_post_product.image_type_incorrect)
            result = false
            return false
          };
      
          if(image.size < 1024 || image.size > limit) {
            alertify.error(message_post_product.image_size_incorrect)
            result = false
            return false
          };
    }
  
    return result
}

function remove_file_showing_in_preview(){
    $('.btn-remove-img').unbind('click').bind('click', function(){
			let name_of_file = $(this).attr('data-name');
			
      if(form_data_user_post_product != null){
        let data = form_data_user_post_product.getAll('message_images')
  
				form_data_user_post_product.delete('message_images')
				
				if(data.length == 1) form_data_user_post_product = null;
	
				if(data.length > 1){
					for(let i = 0; i < data.length; i++){
						if(data[i].name != name_of_file){
							form_data_user_post_product.append('message_images', data[i])
						}
					}
				}
      }
      
      $(this).parent().remove()
    })
  }

function preview_image_before_send(images){
    for(let i = 0; i < images.length; i++){
        let image = images[i];

        let reader = new FileReader();
  
        reader.onload = function(e){
            // show img in #test-img-user-avatar for check error or loaded then if loaded display in #img-user-avatar 
            base64_img = e.target.result
    
            $('.preview-image-product .wrap-content').append(`
                <div class="wrap-image">
                    <img src="${base64_img}" alt="">
                    <div data-name="${image.name}" class="btn-remove-img"><i class="fa fa-times" aria-hidden="true"></i></div>
                </div>`)
    
            remove_file_showing_in_preview()
        }
    
        reader.readAsDataURL(image)
    }
}

function get_selected_product_type(){
    let type_product_selected = document.getElementById("input-select-type-product");
    let index_of_type_product = type_product_selected.selectedIndex;
    let type_product = type_product_selected.options[index_of_type_product].getAttribute("data-type");
    
    return type_product;
}

function user_select_images_product(){
    $('#fileselect').on("change", function(event){
        let images = event.target.files;
        
        if(!validation_images(images)) return false; 
        preview_image_before_send(images)

        let form_data = new FormData()
        for(let i = 0; i < images.length; i++) {
            form_data.append('message_images', images[i]);
        }

        form_data_user_post_product = form_data
    })
}

function user_post_new_product(){
    $("#btn-post-product").on("click", function(event){
        event.preventDefault();
        
        let type_product_selected = get_selected_product_type();
        let title_product = $("#input-name-product").val();
        let description_product = $("#input-description-product").val();
        let price_product = $("#input-price-product").val();
        
        if(form_data_user_post_product == null || type_product_selected == null || title_product == "" || description_product == "" || price_product == "") {
            alertify.error(message_post_product.information_required);
            return false;
				}
				
        form_data_user_post_product.append('type_product_selected', type_product_selected);
        form_data_user_post_product.append('title_product', title_product);
        form_data_user_post_product.append('description_product', description_product);
        form_data_user_post_product.append('price_product', price_product);

        $.ajax({
            type: "POST",
            url: "/user-post-new-product",
            data: form_data_user_post_product,
            processData: false, 
            contentType: false,
            success: function(){
                alertify.success(message_post_product.post_product_success);
                remove_data_in_form();
            },
            error: function(msg){
                alertify.error(msg.responseText);
            }
        })
    });
}

$(document).ready(function(){
    user_post_new_product();
    user_select_images_product();
})
