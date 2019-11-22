const fs = require('fs');
const CONSTANTS = require('../../Config/app.constants')
const imageDirPath = './' + CONSTANTS.IMAGE_DIRECTORY_PATH;
// CREATE DIRECTORY IF NOT EXIST
if (!fs.existsSync(imageDirPath)){
    fs.mkdirSync(imageDirPath);
} 

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