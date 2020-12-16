const render_home_page = (req, res) =>{
    
    return res.render('./home/index')
}

const render_product_page = (req, res) => {
    return res.render('./home/product')
}

const render_search_products_page = (req, res) => {
    return res.render('./home/search_products')
}

const render_search_contact_page = (req, res) => {
    return res.render('./home/contact')
}

const render_post_product_page = (req, res) => {
    return res.render('./home/post_product')
}

const render_phone_products = (req, res) => {
    const TYPE_PRODUCTS = require("./product_controllers").TYPE_PRODUCTS;
    let type_product = req.params.type_product;

    if(TYPE_PRODUCTS.includes(type_product)){
        return res.render('./home/categories');
    }
    
    return res.redirect("/error");
}

module.exports = {
    render_home_page,
    render_product_page,
    render_search_products_page,
    render_search_contact_page,
    render_post_product_page,
    render_phone_products
}