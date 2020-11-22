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

module.exports = {
    render_home_page,
    render_product_page,
    render_search_products_page,
    render_search_contact_page,
    render_post_product_page
}