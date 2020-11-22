const express = require('express');
const {home_controllers, auth_controllers, user_controllers} = require('../controllers/index')

let router = express.Router();

function init_router(app){
    app.get('/login',auth_controllers.check_logout ,auth_controllers.render_login);
    app.get('/recover',auth_controllers.check_logout, auth_controllers.user_recover_account);
    app.get('/register',auth_controllers.check_logout, auth_controllers.render_register);
    app.get('/' ,home_controllers.render_home_page);

    app.post('/register',auth_controllers.check_logout, auth_controllers.user_register)
    app.post('/login',auth_controllers.check_logout, auth_controllers.user_login)
    app.get('/logout',auth_controllers.check_login, auth_controllers.user_logout)

    app.get('/my-account',auth_controllers.check_login, user_controllers.render_user_profile_page);
    app.get('/product', home_controllers.render_product_page);
    app.get('/search', home_controllers.render_search_products_page);
    app.get('/contact', home_controllers.render_search_contact_page );
    app.get('/post-product',auth_controllers.check_login, home_controllers.render_post_product_page );

    app.post("/user-update-profile",auth_controllers.check_login, user_controllers.user_update_profile)

    // catch 404 and forward to error handler
    router.use(function(req, res, next) {
        // respond with html page
        return res.render('./404_page/index')
    });

    return app.use('/', router)
}

module.exports = init_router;