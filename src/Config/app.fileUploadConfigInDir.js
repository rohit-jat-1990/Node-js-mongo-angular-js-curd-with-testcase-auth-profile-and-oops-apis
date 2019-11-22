const multer = require('multer');
const CONSTANTS = require('./app.constants')

/**
 * @constant storage
 * @description storage for upload a file in directory
 */

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
		cb(null, 'images')
	},
  limits: {
      fileSize: CONSTANTS.MAX_FILE_SIZE
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(CONSTANTS.FILE_EXTENSION_MATCH)) {            
          return cb(new Error(CONSTANTS.MESSAGES.ALLOW_MEDIA))
      }
      cb(undefined, true)
  },
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname );
	}
});
module.exports = storage;
