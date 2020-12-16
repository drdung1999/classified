const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let product_schemma = new Schema({
    seller_id: String,
    images: [],
    type: String,
    price: Number,
    seller_phone: String,
    address: String,
    name_product: String,
    product_description: String,
    view: {type: Number, default: 0},
    created_at: {type: Number, default: Date.now},
    updated_at: {type: Number, default: null},
    deleted_at: {type: Number, default: null}
  });

product_schemma.statics = {
  create_new(product_data_to_create_new){
    return this.create(product_data_to_create_new);
  },

  get_list_items_of_category(type,sort, skip){
    skip = skip * 10;
    return this.find({
      "type": type,
    }).limit(10).sort(sort).skip(skip).exec();
  },

  find_product_by_id(product_id){
    return this.findOne({"_id": product_id}).exec();
  },

  count_view_product(product_id){
    return this.updateOne({"_id": product_id, },{ $inc: { view: 1 } }).exec();
  }
}


module.exports = mongoose.model('products', product_schemma);

