const jwt = require('jsonwebtoken')
const secret = require('../../Config/app.secret').getSecret()
const User = require('../Models/UserModel')
const APIResponseClass = require('../../Services/APIResponseClass')
const CONSTANTS = require('../../Config/app.constants')
/**
 * @class Authenticate
 * @method verifyToken
 * @description middleware to verify token
 */
class Authenticate {
  async verifyToken (req, res, next) {
    try {
        const token = req.header('Authorization').replace(CONSTANTS.AUTHORIZATION_STRING, '')
        const decoded = jwt.verify(token,secret)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {     
          return res.status(CONSTANTS.API_STATUS_CODES.UNAUTHORIZED).send(
            APIResponseClass.errorResponse({message:CONSTANTS.MESSAGES.INVALID_TOKEN}));         
        }    
        req.token = token
        req.user = user
        next();
    } catch (error) {
      return res.status(CONSTANTS.API_STATUS_CODES.UNAUTHORIZED).send(
        APIResponseClass.errorResponse({message:CONSTANTS.MESSAGES.INVALID_TOKEN}))
    }
  }
}

module.exports = new Authenticate()
