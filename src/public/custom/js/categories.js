const TYPE_PRODUCTS = ["phone","electronic","car", "bike", "furniture","pet", "book", "fashion", "kid", "services", "job", "real_estate"];
let CATEGORY_NAME = null;
let SORT_CATEGORY_ITEMS = null;
let SKIP = 0;

function convert_timestamp(time){
    let present_time = new Date().getTime()
    let timestamp = new Date(time)
    let re = /^([0-9]+:[0-9]+)/
  
    if(present_time < time) { 
      alertify.error(error_undefine_mess)
      return
    }
  
    if(new Date().toLocaleDateString() == timestamp.toLocaleDateString()){
      ts = present_time - time;
  
      //   second
      ts = ts / 1000
      if(ts < 60){
        // example 09:14 => 9:14
        let string_to_return = timestamp.toTimeString().match(re)[0]
        if(string_to_return[0] == '0') string_to_return = string_to_return.substr(1)
        return string_to_return
      }
  
      //   minute
      ts = ts / 60
      if(ts < 60){
        let string_to_return = timestamp.toTimeString().match(re)[0]
        if(string_to_return[0] == '0') string_to_return = string_to_return.substr(1)
        return string_to_return
      }
  
      // hour
      ts = ts / 60
      if(ts < 24){
        let string_to_return = timestamp.toTimeString().match(re)[0]
        if(string_to_return[0] == '0') string_to_return = string_to_return.substr(1)
        return string_to_return
      }
    }
  
  
    // day
    else {
      let timeline = timestamp.toLocaleDateString()
      timeline = timeline.split('/')
  
      // example 14:14:47 GMT+0700 (Indochina Time) => 14:14 = 14p 14s
      let hour = timestamp.toTimeString().match(re)[0]
      
      return `${hour} ${timeline[1]} Tháng ${timeline[0]}, ${timeline[2]}`
    }
}

function handle_user_click_category_item(){
    $('.category-item').on('click', function(){
        SKIP = 0;
        // add class for category item when user click
        $('.category-item').each(function(){
            $(this).removeClass('active-category');
        })
        $(this).addClass("active-category");

        SORT_CATEGORY_ITEMS  = $('.sort-category-item option:selected').val();

        CATEGORY_NAME = $(this).attr('data-type');
        if(!TYPE_PRODUCTS.includes(CATEGORY_NAME)) window.location.replace("/error");

        get_product_of_category();
    })
}

function sort_category_items(){
    $('.sort-category-item').on('change', function(){
        SKIP = 0;
        SORT_CATEGORY_ITEMS  = $('.sort-category-item option:selected').val();
        CATEGORY_NAME = $('.list-categories').find(`li.active-category`).attr('data-type');

        get_product_of_category();
    })
}

function show_list_category_items(list_category_items){
    $(".list-showing-products").empty();

    if(list_category_items.length > 0){
        list_category_items.forEach( product => {
            $('.list-showing-products').append(`
                <a href="/view-product-${product._id}">
                    <li>
                    <img src="images/products/${product.images[0]}" title="${product.name_product}" alt="${product.name_product}">
                    <section class="list-left">
                    <h5 class="title">${product.name_product}</h5>
                    <span class="adprice">${new Intl.NumberFormat().format(product.price)} đ</span>
                    </section>
                    <section class="list-right">
                    <span class="date">${convert_timestamp(product.created_at)}</span>
                    <span class="cityname">${product.address}</span>
                    </section>
                    <div class="clearfix"></div>
                    </li> 
                </a>`);
        })
    }
    
    else{
        alertify.success("Loại sản phẩm này chưa có người bán.");
    }
}

function user_view_more_product(){
    $(".btn-view-more-product").on("click", function(){
        let role = $(this).attr("value");

        // xem trang truoc
        if(role == 1) {
            if(SKIP == 0){
                alertify.success("Bạn đang xem trang đầu tiên")
            }
            else{
                SKIP -= 1;
                get_product_of_category();
            }
        }
        // xem trang sau
        if(role == -1){
            SKIP += 1;
            get_product_of_category();
        }

        
    })
}

function get_product_of_category(){
    $.ajax({
        type: 'GET',
        url: `/get-list-items-of-category-${CATEGORY_NAME}-${SORT_CATEGORY_ITEMS}-${SKIP}`,
        success: function(data) {
            if(typeof(data) == "object"){
                show_list_category_items(data);
            }
            if(typeof(data) == "string"){
                alertify.success(data);
                SKIP -= 1;
            }
        },
        error: function(msg){
            alertify.error(msg.responseText);
        }
    })
}

$(document).ready(function(){
    // check for valid path
    let category_name = window.location.pathname.replace("/product-","");
    if(!TYPE_PRODUCTS.includes(category_name)) window.location.replace("/error");

    setTimeout(function () {
        $('.list-categories').find(`li[data-type=${category_name}]`).click();
    }, 10)

    handle_user_click_category_item();
    sort_category_items();
    user_view_more_product()
})