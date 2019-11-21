const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../Models/UserModel')
const emailService = require('../../Services/Email');
const secret = require('../../Config/app.secret').getSecret()
const APIResponseClass = require('../../Services/APIResponseClass')
const CONSTANTS = require('../../Config/app.constants')
function generateJWTToken(params = {}) {
  return jwt.sign(params, secret, { expiresIn: CONSTANTS.JWT_TOKEN_EXPIRE_IN })
}
/**
 * @class UserController
 * @method store,profile,update,forgotPassword,resetPassword,changePassword,verifyEmail,show
 * @description controller for user register, get profile, forgot password, reset password, change password, verify email and update profile
 */
class UserController {
  async store(req, res) { // REGISTER        
    try {
      const email = req.body.email;
      const fields = "email";
      const userObjects = {conditionObject:{email},fields};
      
      if (await User.findUserDetail(userObjects)) {
        throw new Error(CONSTANTS.MESSAGES.USER_EXIST);        
      }
      const user = await User.createNewUser(req);
      const token = await user.generateAuthToken();

      const objects = {conditionObject:{ _id: user._id },setFields:{ reset_password_token: token }};
      await User.updateUserWithCondition(objects);

      return res.send(APIResponseClass.successResponse({ 
          data:{user,token},
          message:CONSTANTS.MESSAGES.REGISTER_EMAIL
        }))
    } catch (error) {
      return res.status(CONSTANTS.API_STATUS_CODES.VALIDATION_FAIL).send(
        APIResponseClass.errorResponse({message:error.message}))
    }
  }

  async profile(req, res) { // GET PROFILE 
    return res.send(APIResponseClass.successResponse({data:{user:req.user}}))
  }

  async update(req, res) { // UPDATE PROFILE
    try {
    const updates = Object.keys(req.body)
    const email = req.body.email;
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))    
      if (!isValidOperation) {
        throw new Error(CONSTANTS.MESSAGES.UPDATE_REQUIRED_FIELDS);        
      }
      const fields = "email";
      const userObjects = {conditionObject:{email,_id:{$ne:req.user._id}},fields};
      if (await User.findUserDetail(userObjects)) {
        throw new Error(CONSTANTS.MESSAGES.USER_EXIST);                
      }else{
        updates.forEach((update) => req.user[update] = req.body[update])
        await User.saveUser(req.user);
      }
      return res.send(APIResponseClass.successResponse({data:{user:req.user},message:CONSTANTS.MESSAGES.PROFILE_UPDATED}));
    } catch (error) {      
      return res.status(CONSTANTS.API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(
        APIResponseClass.errorResponse({message:error.message}))      
    }
  }
  async forgotPassword(req, res) { // FORGOT PASSWORD
    try {
      if (!req.body.email) {
        throw new Error(CONSTANTS.MESSAGES.PROVIDE_VALID_EMAIL);
      }
      const email = req.body.email;
      const fields = "name status is_email_verified email";
      const objects = {conditionObject:{email},fields};
      const user = await User.findUserDetail(objects); //checking if the email address sent by client is present in the db(valid)
      
      if (!user) {
        throw new Error(CONSTANTS.MESSAGES.EMAIL_NOT_FOUND);        
      }
      if (!user.is_email_verified) {
        throw new Error(CONSTANTS.MESSAGES.NEED_TO_VERIFY_EMAIL);         
      }
      const token = await generateJWTToken({ id: user._id }) // GENERATE FORGOT PASSWORD RANDOM TOKEN

      const objectsCond = {conditionObject:{ _id: user._id },setFields:{ reset_password_token: token }};
      await User.updateUserWithCondition(objectsCond);
      
      // EMAIL OPTIONS
      const link = `http://localhost:3000/api/v1/api/reset-password?token=${token}`;
      const mailOptions = {
        user,
        link,
        subject: CONSTANTS.EMAIL_SUBJECTS.FORGOT_PASSWORD_SUBJECT,
        content: `<h4><b>Reset Password</b></h4><p>To reset your password, complete this form:</p>
          <a href="` + link + `"> Reset Password </a>
          <br><br><p>--Team</p>`
      }
      const email_response = await emailService.send(mailOptions)      
      if(email_response.is_email_sent){
        return res.send(APIResponseClass.successResponse({data:{},message:email_response.message}))
      }else{        
        return res.status(CONSTANTS.API_STATUS_CODES.VALIDATION_FAIL).send(
          APIResponseClass.errorResponse({message:email_response.message})) 
      }    
    } catch (error) {
      return res.status(CONSTANTS.API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(
        APIResponseClass.errorResponse({message:CONSTANTS.MESSAGES.MAKE_SURE_EMAIL_CONFIG}))        
    }
  }
  async resetPassword(req, res) { // RESET PASSWORD     
     try {
      const { token, new_password, confirm_password } = req.body;      
      let decode_token = '';
      await jwt.verify(token, secret, (error, decoded) => {
        decode_token = decoded
        if(error){
          throw new Error(CONSTANTS.MESSAGES.INVALID_TOKEN);          
        }
      });
      
      const fields = "email password status";
      const userObjects = {conditionObject:{ _id: decode_token.id, 'reset_password_token': token },fields};
      const user = await User.findUserDetail(userObjects);
      if(!user){
        throw new Error(CONSTANTS.MESSAGES.TOKEN_EXPIRED);          
      }
      if (new_password !== confirm_password) {                
        throw new Error(CONSTANTS.MESSAGES.NEW_CONFIRM_PASSWORD_NOT_MATCH);          
      }else{
        const password_hash = await bcrypt.hash(new_password, 8)
        const objects = {conditionObject:{ _id: user._id },setFields:{ password: password_hash }};
        await User.updateUserWithCondition(objects);
        return res.send(APIResponseClass.successResponse({data:{},message:CONSTANTS.MESSAGES.PASSWORD_CHANGED}))
      }
    } catch (error) {
      return res.status(CONSTANTS.API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(
        APIResponseClass.errorResponse({message:error.message}))      
    }
  }
  async changePassword(req, res) { // CHANGE PASSWORD 
    try {
      const { current_password, new_password, confirm_password } = req.body;

      const fields = "name password status tokens";
      const userObjects = {conditionObject:{email:req.user.email},fields};
      const user = await User.findUserDetail(userObjects);

      if (!(await bcrypt.compare(current_password, user.password))) {
          throw new Error(CONSTANTS.MESSAGES.CURRENT_PASSWORD_N_MATCH);        
      }
      if (new_password !== confirm_password) {
        throw new Error(CONSTANTS.MESSAGES.NEW_CONFIRM_PASSWORD_NOT_MATCH);        
      }
      const confirm_password_hash = await bcrypt.hash(confirm_password, 8)

      const objects = {conditionObject:{ _id: user._id },setFields:{ password: confirm_password_hash, reset_password_token: null }};
      await User.updateUserWithCondition(objects);      
      return res.send(APIResponseClass.successResponse({message:CONSTANTS.MESSAGES.PASSWORD_CHANGED}));
    } catch (error) {
      return res.status(CONSTANTS.API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(
        APIResponseClass.errorResponse({message:error.message}))      
    }
  }
  async verifyEmail(req, res) { // VERIFY EMAIL 
    try {
      const token = req.body.token;
      if (!token) {
        throw new Error(CONSTANTS.MESSAGES.LINK_INVALID);
      }
      let decode_token = '';
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          throw new Error(CONSTANTS.MESSAGES.LINK_INVALID);
        }
        decode_token = decoded
      });
      const fields = "name status";
      const userObjects = {conditionObject:{ _id: decode_token._id, 'reset_password_token': token },fields};
      let user = await User.findUserDetail(userObjects);
      
      if (!user) {
        throw new Error(CONSTANTS.MESSAGES.LINK_EXPIRED);
      }
      if (user.status) {
        throw new Error(CONSTANTS.MESSAGES.EMAIL_ALREADY_VERIFIED);
      }
      const objects = {conditionObject:{ _id: user._id },setFields:{ status: true, is_email_verified:true }};
      await User.updateUserWithCondition(objects)
      
      return res.send(APIResponseClass.successResponse({
          message:CONSTANTS.MESSAGES.EMAIL_VERIFIED,
          data:{user:{},token}
        }))
    } catch (error) {
      return res.status(CONSTANTS.API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(
        APIResponseClass.errorResponse({message:error.message}))
    }
  }
  async show(req, res) { // GET USER BY ID AND FETCH ALL POSTS
      try {
        const user = await User.findByIdAndPopulatePosts(req.params.id);
        return res.send(APIResponseClass.successResponse({ 
            data:{user},
            message:""
          }))
      } catch (error) {
        return res.status(CONSTANTS.API_STATUS_CODES.VALIDATION_FAIL).send(
          APIResponseClass.errorResponse({message:this.error}))
      }
    }
}
module.exports = new UserController()
