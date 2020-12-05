const {product_services} = require('../services/index');
const helper_upload_file = require('../helper/upload_images');
const {post_new_product_message} = require('../../lang/vi');

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

module.exports = {
    post_new_product
}
