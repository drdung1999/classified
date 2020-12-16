const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let view_schema = new Schema({
    product_id: String,
    viewers: [],
    created_at: {type: Number, default: Date.now},
    updated_at: {type: Number, default: null},
    deleted_at: {type: Number, default: null}
  });

view_schema.statics = {
    create_new(product_id){
        return this.create({"product_id": product_id})
    },

    check_viewed_products(products_id, viewer_id){
        return this.findOne({
            "product_id": products_id,
            "viewers": viewer_id
        }).exec();
    },

    tick_viewed(product_id,id_viewer){
        return this.updateOne({"product_id": product_id},{$push: {"viewers": id_viewer}}).exec();
    }
}


module.exports = mongoose.model('views', view_schema);

