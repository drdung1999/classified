const user_models = require('../models/user_models');
const product_models = require('../models/product_models');
const view_models = require('../models/view_models');

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

        let product_data = await product_models.create_new(product_data_to_create_new);
        view_models.create_new(product_data._id);

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

const view_detail_product = (product_id) => {
    return new Promise( async (resolve, reject) => {
        let product_data = await product_models.find_product_by_id(product_id);

        //product_models.increase_product_view(product_id);

        if(!product_data) return reject();

        return resolve(product_data);
    });
}

const count_view_product = async (id_viewer, product_id) => {
    let check_viewed_products = await view_models.check_viewed_products(product_id,id_viewer);

    if(!check_viewed_products){
        await view_models.tick_viewed(product_id,id_viewer);

        await product_models.count_view_product(product_id);
    }
}

module.exports = {
    post_new_product,
    get_list_items_of_category,
    view_detail_product,
    count_view_product
} 
