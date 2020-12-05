const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user_schema = new Schema({
    email: {type: String, trim: true},
    password: String,
    phone_number: {type: String, default: null},
    address: {type: String, default: null},
    avatar: {type: String, default: "avatar-defult.jpg"},
    role: {type: String, default: "user"},
    username: {type: String, default: null},
    created_at: {type: Number, default: Date.now},
    updated_at: {type: Number, default: null},
    deleted_at: {type: Number, default: null}
  });

// create index for search
user_schema.index( { username: "text" } );

user_schema.statics = {
    create_new(email, password){
        return this.create({
            "email": email,
            "password": password,
        })
    },

    find_by_id(user_id){
        return this.findOne({
            "_id": user_id
        }).exec();
    },

    check_account_is_exists(email, password){
        return this.findOne({"email": email, "password": password}).exec();
    },

    get_user_profile(user_id){
        return this.findOne({"_id": user_id}).exec();
    },

    user_update_profile(user_id,username,phone_number,address){
        return this.updateOne({"_id": user_id, "username": username, "phone_number": phone_number, "address": address}).exec();
    }
}


module.exports = mongoose.model('users', user_schema);

