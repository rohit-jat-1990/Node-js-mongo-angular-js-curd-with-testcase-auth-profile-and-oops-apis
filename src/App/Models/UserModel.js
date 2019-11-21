/**
* Model.deleteMany()
* Model.deleteOne()
* Model.find()
* Model.findById()
* Model.findByIdAndDelete()
* Model.findByIdAndRemove()
* Model.findByIdAndUpdate()
* Model.findOne()
* Model.findOneAndDelete()
* Model.findOneAndRemove()
* Model.findOneAndReplace()
* Model.findOneAndUpdate()
* Model.replaceOne()
* Model.updateMany()
* Model.updateOne()
**/

/**
 * @model UserModel
 * @method findUserDetail,createNewUser,saveUser,updateUserWithCondition,findByIdUsers
 * @description model class that maps to the data relation here
 */
const UserSchema = require('../Schema/UserSchema');

UserSchema.findUserDetail = (objects) => {
    return UserSchema.findOne(objects.conditionObject).select(objects.fields)
};

UserSchema.createNewUser = (requestObject) =>{    
    const user = new UserSchema(requestObject.body)
    return UserSchema.saveUser(user);
}

UserSchema.saveUser = (requestObject) => requestObject.save();

UserSchema.updateUserWithCondition = (objects)=> UserSchema.updateOne(objects.conditionObject, { $set:objects.setFields} );

UserSchema.findByIdAndPopulatePosts = (id)=>{
    return UserSchema.findById(id).populate("posts");    
}

UserSchema.findByIdUsers = (id)=>{
    return UserSchema.findById(id);    
}

module.exports = UserSchema;