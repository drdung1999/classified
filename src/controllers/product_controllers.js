const {product_services} = require('../services/index');
const helper_upload_file = require('../helper/upload_images');
const {post_new_product_message} = require('../../lang/vi');
const helper = require('../helper/index');
const uid = require('uid');

const TYPE_PRODUCTS = ["phone","electronic","car", "bike", "furniture","pet", "book", "fashion", "kid", "services", "job", "real_estate"];

const post_new_product = (req, res) => {
    helper_upload_file.message_image(req, res, async (error) => {
        if(error) {
          if(error.message){
            return res.status(500).send(error.message)
          }
    
          return res.status(500).send(post_new_product_message.unspecified_error)
        }
        
        try {
          let user_id = req.session.user_id;
          let type_product_selected = req.body.type_product_selected;
          let title_product = req.body.title_product;
          let description_product = req.body.description_product;
          let price_product = req.body.price_product;
          let src_images = [];
          
          req.files.forEach(file => {
            src_images.push(file.filename)
          })
          
          if(!type_product_selected || !title_product || !description_product || !price_product || src_images.length == 0) 
          return res.status(500).send(post_new_product_message.unspecified_error)

          if(!TYPE_PRODUCTS.includes(type_product_selected))
          return res.status(500).send(post_new_product_message.unspecified_error);
    
          let result_post_new_product = await product_services.post_new_product(user_id,price_product, type_product_selected, title_product, description_product, src_images);

          return res.status(200).send(result_post_new_product);
        } catch (error) {
          return res.status(500).send(error)
        }
      })
}

const get_list_items_of_category = async (req, res) => {
  try {
    let category_name = req.params.category_name;
    let sort_category_items = req.params.sort_category_items;
    let skip = Number(req.params.skip);

    if(skip == NaN || skip < 0){
      return res.status(500).send(post_new_product_message.unspecified_error);
    } 

    if(!TYPE_PRODUCTS.includes(category_name))
    return res.status(500).send(post_new_product_message.unspecified_error);

    if(sort_category_items < 1 || sort_category_items > 3)
    return res.status(500).send(post_new_product_message.unspecified_error);


    let list_items_of_category = await product_services.get_list_items_of_category(category_name,sort_category_items,skip);

    if(skip > 0 && list_items_of_category.length == 0) {
      return res.status(200).send(post_new_product_message.viewed_all_product);
    }

    return res.status(200).send(list_items_of_category);
  } catch (error) {
    return res.status(500).send(error);
  }
}

const view_detail_product = async (req, res) => {
    try {
      let product_id = req.params.product_id;

      // set session for count view product
      if(!req.session.user_id && !req.session.validate){
        req.session.validate = `${uid(11)}+${new Date().getTime()}`
      }

      product_services.count_view_product(req.session.user_id || req.session.validate, product_id);

      let product_data = await product_services.view_detail_product(product_id);

      let time_post_product = helper.convert_timestamp(product_data.created_at);
      let gia_sp = new Intl.NumberFormat().format(product_data.price);
      let name_product = helper.convert_product_type_to_vi(product_data.type);

      return res.render('./home/product_detail', {product_data,time_post_product, gia_sp, name_product });
    } catch (error) {
      return res.redirect('/error');
    }
 
}

module.exports = {
    post_new_product,
    TYPE_PRODUCTS,
    get_list_items_of_category,
    view_detail_product
}
