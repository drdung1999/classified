const {user_services} = require('../services/index');
const {message_valid_user_update_profile} = require('../../lang/vi');
const user_validation = require('../validation/user_validation');

const render_user_profile_page = async (req, res) => {
    let user_id = req.session.user_id;

    let user_profile = await user_services.get_user_profile(user_id);
    
    return res.render('./home/user_profile', {user_profile})
}

const user_update_profile = async (req, res) => {
    try{
        let user_id = req.session.user_id;
        let username = req.body.username;
        let phone_number = req.body.phone_number;
        let address = req.body.address;

        let valid_phone_number = user_validation.validation_phone_number(phone_number);
        let valid_username = user_validation.validation_username(username);
        let valid_address = user_validation.validation_address(address);
        
        if(valid_phone_number || valid_username || valid_address) return res.status(500).send(valid_phone_number || valid_username || valid_address);

        await user_services.user_update_profile(user_id,username,phone_number,address);
        
        return res.status(200).send(message_valid_user_update_profile.update_profile_success);
    }
    catch(err){
        return res.status(500).send(message_valid_user_update_profile.error_undefined);
    }
}

module.exports = {
    render_user_profile_page,
    user_update_profile
}