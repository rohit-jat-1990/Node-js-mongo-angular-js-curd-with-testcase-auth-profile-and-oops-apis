/**
 * @middleware FileUploadInDirectory
 * @method single
 * @description middleware used for uploading a image in Directory (/images)
 */
const multer = require('multer')
const storage = require('../../Config/app.fileUploadConfigInDir');
const uploads = multer({storage});
const result = uploads.single('profile_image')
module.exports = result;