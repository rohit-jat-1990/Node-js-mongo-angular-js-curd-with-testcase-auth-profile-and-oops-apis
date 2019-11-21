/**
 * @middleware FileUploadInDb
 * @method single
 * @description middleware used for uploading a image in binary format
 */
const multer = require('multer')
const storage = require('../../Config/app.fileUploadConfigInDb');
const uploads = multer(storage);
const result = uploads.single('profile_image')
module.exports = result;