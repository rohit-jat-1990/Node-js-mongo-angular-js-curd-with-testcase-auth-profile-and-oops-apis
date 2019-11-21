const bcrypt = require('bcryptjs')
const User = require('../Models/UserModel')
const CONSTANTS = require('../../Config/app.constants')
const APIResponseClass = require('../../Services/APIResponseClass')
/**
 * @class SessionController
 * @method store,logout,logoutAll
 * @description controller for login, logout and logoutAll
 */
class SessionController {
  async store (req, res) { //LOGIN
    try {
      const { email, password } = req.body
      const fields = "name password status tokens";
      const objects = {conditionObject:{email},fields};
      const user = await User.findUserDetail(objects);
      
      if (!user) {
        throw new Error(CONSTANTS.MESSAGES.USER_NOT_FOUND);        
      }
      if (!user.status) {
        throw new Error(CONSTANTS.MESSAGES.EMAIL_NOT_VERIFY);        
      }
      if (!(await bcrypt.compare(password, user.password))) {  
        throw new Error(CONSTANTS.MESSAGES.INVALID_PASSWORD);
      }            
      return res.send(APIResponseClass.successResponse({ 
        data:{user,token:await user.generateAuthToken()},
        message:""
      }))
    } catch (error) {
      return res.status(CONSTANTS.API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(
        APIResponseClass.errorResponse({message:error.message}))
    }
  }
  async logout (req, res) { // LOGOUT A USER
    try {      
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await User.saveUser(req.user);        
        res.send()
    } catch (error) {
        return res.status(CONSTANTS.API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(
          APIResponseClass.errorResponse({message:error.message}))
    }
  }
  async logoutAll (req, res) { // LOGOUT FROM ALL DEVICES
    try {
      req.user.tokens = []
      await User.saveUser(req.user);      
      res.send()
    } catch (error) {        
        return res.status(CONSTANTS.API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(
          APIResponseClass.errorResponse({message:error.message}))
    }
  }
}

module.exports = new SessionController()
