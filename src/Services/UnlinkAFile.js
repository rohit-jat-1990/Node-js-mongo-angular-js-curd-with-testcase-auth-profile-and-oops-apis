const fileSystem = require('fs');
/**
 * @class UnlinkAFile
 * @method unlinkFile
 * @description class for delete/unlink a file from directory before uploading
 */
class UnlinkAFile {
  unlinkFile(fileObject){
    try {
      fileSystem.unlinkSync(fileObject);
      return true;
    } catch(error) {
      return error.message;
    }    
  }
}
module.exports = new UnlinkAFile();