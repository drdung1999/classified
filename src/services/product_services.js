const user_models = require('../models/user_models');
const product_models = require('../models/product_models');

const post_new_product = (user_id,price_product, type_product_selected, title_product, description_product, src_images) => {
    return new Promise( async (resolve, reject) => {
        let user_data = await user_models.find_by_id(user_id);
        if(!user_data) return reject();

        let product_data_to_create_new = {
            seller_id: user_id,
            images: src_images,
            type: type_product_selected,
            price: price_product,
            seller_phone: user_data.phone_number,
            address: user_data.address,
            name_product: title_product,
            product_description: description_product
        }

        await product_models.create_new(product_data_to_create_new);

        return resolve();
    })
}

const get_list_items_of_category = (category_name,sort_category_items, skip) => {
    return new Promise( async (resolve, reject) => {
        let sort = null;
        if(sort_category_items == 1) sort = {"created_at": -1}
        if(sort_category_items == 2) sort = {"price": 1}
        if(sort_category_items == 3) sort = {"price": -1}

        let list_items_of_category = await product_models.get_list_items_of_category(category_name,sort, skip);
        
        return resolve(list_items_of_category);
    })
}

module.exports = {
    post_new_product,
    get_list_items_of_category
} 
