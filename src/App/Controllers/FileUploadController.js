const User = require('../Models/UserModel')
const sharp = require('sharp')
const CONSTANTS = require('../../Config/app.constants')
const APIResponseClass = require('../../Services/APIResponseClass')
/**
 * @class FileUploadController
 * @method fileUploadInDb,customError,getProfileImage,fileUploadInDirectory
 * @description controller for file upload, get profile link
 */
class FileUploadController 
{
  async fileUploadInDb (req,res) { // FILE UPLOAD IN DB IN BINARY FORMAT 
    try{
      const buffer = await sharp(req.file.buffer).resize({width:CONSTANTS.RESIZE_WIDTH,height:CONSTANTS.RESIZE_HEIGHT}).png().toBuffer();      
      const objects = {conditionObject:{ _id: req.user._id },setFields:{ original_profile_image: req.file.buffer, avatar: buffer}};
      await User.updateUserWithCondition(objects);
      return res.send(APIResponseClass.successResponse({message:CONSTANTS.MESSAGES.FILE_UPLOADED}));
    }catch(error){
      return res.status(CONSTANTS.API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(
        APIResponseClass.errorResponse({message:error.message}))      
    }
  }

  customError (error,req,res,next) { // FILE CUSTOM ERROR MESSAGE         
    res.status(CONSTANTS.API_STATUS_CODES.VALIDATION_FAIL).send(
      APIResponseClass.errorResponse({message:error.message}))    
  }
  async getProfileImage (req,res) { // GET PROFILE //http://localhost:3000/api/v1/users/get-profile-image/5dd39845b58c3731aabd6da2/avatar
    // to get access original http://localhost:3000/api/v1/users/get-profile-image/5dd39845b58c3731aabd6da2/original
    try{
      const user = await User.findByIdUsers(req.params.id);      
      res.set("Content-Type","image/png");
      
      if(!user || !user.avatar){
         user.avatar = null
      }
      
      if(req.params.avatar === CONSTANTS.ORIGINAL){
        return res.send(user.original_profile_image);
      }else{
        return res.send(user.avatar);
      }
    }catch(error){
      return res.status(CONSTANTS.API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(
        APIResponseClass.errorResponse({message:error.message}))
    }
  }

  async fileUploadInDirectory (req,res) { // FILE UPLOAD IN IMAGES FOLDER
    try{
      const objects = {conditionObject:{ _id: req.user._id },setFields:{ profile_image_full_path: "images/" + req.file.filename}};
      await User.updateUserWithCondition(objects);
      return res.send(APIResponseClass.successResponse({message:CONSTANTS.MESSAGES.FILE_UPLOADED}));
    }catch(error){
      return res.status(CONSTANTS.API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(
        APIResponseClass.errorResponse({message:error.message}))      
    }
  }
}
module.exports = new FileUploadController()
