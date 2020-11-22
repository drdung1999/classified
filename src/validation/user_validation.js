const {message_valid_user_update_profile} = require('../../lang/vi');

const validation_phone_number = (phone_number) => {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

    if(phone_number !==''){
        if (vnf_regex.test(phone_number) == false)  return message_valid_user_update_profile.phone_number_incorrect;
        
        return null;
    }else{
        return message_valid_user_update_profile.phone_number_empty;
    }
}

const validation_username = (username) => {
    let regex = new RegExp('[0-9]');

    if(username.length < 5 || username.length > 30) return message_valid_user_update_profile.username_invalid;
    if(regex.test(username)) return message_valid_user_update_profile.username_invalid

    return null;
}

const validation_address = (address) => {
    if(address.length < 5 || address.length > 150) return message_valid_user_update_profile.address_invalid

    return null;
}

module.exports = {
    validation_phone_number,
    validation_username,
    validation_address
}