
const UnlinkFileService = require('../../Services/UnlinkAFile');
/**
 * @class UnlinkFileClass
 * @method unLinkFile
 * @description middleware to unlink a file
 */
class UnlinkFileClass {
  async unLinkFile (req, res, next) {
    await UnlinkFileService.unlinkFile(req.user.profile_image_full_path);
    next();
  }
}

module.exports = new UnlinkFileClass()