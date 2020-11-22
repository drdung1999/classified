const {auth_services} = require('../services/index')
const {auth_message} = require('../../lang/vi')

const render_login = (req, res) => {
    return res.render('./auth/login')
} 

const user_recover_account = (req, res) =>{
    return res.render('./auth/recover_account.ejs')
}

const render_register = (req, res) =>{
    return res.render('./auth/register.ejs')
}

const check_login = (req, res, next) => {
    try {
        let user_id = req.session.user_id
        if(user_id) return next()

        res.redirect('/login')
    } catch (error) {
        res.redirect('/login')
    }
}

const check_logout = (req, res, next) => {
    try {
        let user_id = req.session.user_id
        if(user_id) res.redirect('/')

        next()
    } catch (error) {
        next()
    }
}

const user_register = async (req, res) =>{
    try {
        let email = req.body.email;
        let password = req.body.password;
        
        await auth_services.user_register(email, password)

        return res.status(200).send()
    } catch (error) {
        return res.status(500).send(auth_message.ceate_account_error)
    }
}

const user_login = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        let result = await auth_services.user_login(email, password);

        req.session.user_id = result._id;
        req.session.email = result.email;
        req.session.avatar = result.avatar;
        req.session.phone_number = result.phone_number;
        req.session.created_at = result.created_at;
        req.session.role = result.role;

        return res.status(200).send()
    } catch (error) {
        return res.status(500).send(auth_message.login_error)
    }
}

const user_logout = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
}

module.exports = {
    render_login,
    user_recover_account,
    user_register,
    check_login,
    check_logout, 
    render_register,
    user_login,
    user_logout
}