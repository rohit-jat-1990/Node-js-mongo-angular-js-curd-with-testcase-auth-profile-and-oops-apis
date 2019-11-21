const CONSTANTS = require('../Config/app.constants')
/**
 * @constant storage
 * @description storage for upload a file in db
 */
const storage = {
  limits: {
      fileSize: CONSTANTS.MAX_FILE_SIZE
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(CONSTANTS.FILE_EXTENSION_MATCH)) {
          return cb(new Error(CONSTANTS.MESSAGES.ALLOW_MEDIA))
      }
      cb(undefined, true)
  }
}
module.exports = storage;
