const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator');
const jwt = require('jsonwebtoken')
const secret = require('../../Config/app.secret').getSecret()
const CONSTANTS = require('../../Config/app.constants')
/**
 * @schema UserSchema
 * @description mongoose define the database schema of mongoDB
 */
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true,CONSTANTS.MESSAGES.REQUIRED],
      trim:true
    },
    email: {
      type: String,
      unique: true,
      required: [true,CONSTANTS.MESSAGES.REQUIRED],
      lowercase: true,
      trim:true,
      validate(value){
          if(!validator.isEmail(value)){
              throw new Error(CONSTANTS.MESSAGES.EMAIL_INVALID)
          }
      }
    },
    password: {
      type: String,
      required: [true,CONSTANTS.MESSAGES.REQUIRED],
      select: false,
      trim:true,
      minlength:CONSTANTS.VALIDATIONS.PASSWORD_MIN_LENGTH,
      validate(value){
          if(value.toLowerCase().includes('password')){
              throw new Error(CONSTANTS.MESSAGES.PASSWORD_ERROR);
          }
      }
    },
    reset_password_token : {
      type: String,
      default:null
    },
    status: {
      type: Boolean,
      required: true,
      default: false
    },
    is_email_verified: {
      type: Boolean,
      required: true,
      default: false
    },
    original_profile_image:{
      type:Buffer
    },
    avatar:{
      type:Buffer
    },
    profile_image_full_path:{
      type:String,
      required:false
    },
    tokens:[{
        token:{
            type:String
        }
    }]
  },
  { timestamps: true }
)
// RELATIONSHIP
UserSchema.virtual('posts',{
  ref:'Post',
  localField:'_id',
  foreignField:'owner'
})
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });
// ENCRIPT PASSWORD BEFORE SAVE
UserSchema.pre('save', async function (next) {
  const user = this;
  if(user.isModified('password')){
      user.password = await bcrypt.hash(user.password,CONSTANTS.HASH_NUMBER)
  }
  next()
})

//TO JSON
UserSchema.methods.toJSON = function(){ 
  UserSchema.set('toJSON', { virtuals: true });   
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.tokens
  delete userObject.reset_password_token
  delete userObject.original_profile_image
  delete userObject.avatar
  // add a profile link
  //http://localhost:3000/api/v1/users/get-profile-image/5da1f0a2bb7ca11f4009e10c  
  return userObject
}
// GENERATE AUTH TOKEN
UserSchema.methods.generateAuthToken = async function () {  
  try {   
    const user = this    
    const token = jwt.sign({ _id: user._id.toString() }, secret)    
    user.tokens = user.tokens.concat({ token })
    await user.save();    
    return token;
  }catch(error){    
    return new Error(CONSTANTS.MESSAGES.VALID_KEY);
  }
}

module.exports = mongoose.model('User', UserSchema);