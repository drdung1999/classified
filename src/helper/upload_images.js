const app = require('../config/app');
const uid = require('uid');
const multer = require('multer');
const {post_new_product_message} = require('../../lang/vi');

let image_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, app.image_product_directory)
  },
  filename: function (req, file, cb) {
    let match = app.image_type;
    if(match.indexOf(file.mimetype) == -1) return cb(post_new_product_message.erorr_image_product_type, null)

    let name = `${uid()}-${new Date().getTime()}-${file.originalname}` 
    cb(null, name)
  }
})

let message_image = multer({ 
  storage: image_storage,
  limits: {fileSize: app.image_limit_size}
}).array('message_images',50);

module.exports = {
  message_image
}