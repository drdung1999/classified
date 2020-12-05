const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let product_schemma = new Schema({
    seller_id: String,
    images: [],
    type: String,
    price: String,
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
  }
}


module.exports = mongoose.model('products', product_schemma);

