const user_models = require('../models/user_models')

const user_register = (email, password) => {
    return new Promise( async (resolve, reject) => {
        await user_models.create_new(email, password)
        return resolve()
    })
}

const user_login = (email, password) => {
    return new Promise( async (resolve, reject) => {
        let check_account_is_exists = await user_models.check_account_is_exists(email, password)

        if(check_account_is_exists == null) return reject()

        return resolve(check_account_is_exists)
    })
}

module.exports = {
    user_register,
    user_login
}