const user_models = require("../models/user_models");

const get_user_profile = (user_id) => {
    return new Promise( async (resolve, reject) => {
        let user_profile = await user_models.get_user_profile(user_id);

        return resolve(user_profile);
    })
}

const user_update_profile = (user_id,username,phone_number,address) => {
    return new Promise( async (resolve, reject) => {
        await user_models.user_update_profile(user_id,username,phone_number,address);

        return resolve();
    })
}

module.exports = {
    get_user_profile,
    user_update_profile
}