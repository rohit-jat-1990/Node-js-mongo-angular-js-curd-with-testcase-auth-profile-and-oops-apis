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
 * @model PostModel
 * @method findAllPosts,findByIdAndPopulateOwner,createNewPost,savePost,findPostByIdAndDelete,findPostDetail
 * @description model class that maps to the data relation here
 */
const PostSchema = require('../Schema/PostSchema');

PostSchema.findAllPosts = () => {
  return PostSchema.find();
};

PostSchema.findByIdAndPopulateOwner = (id)=>{
  return PostSchema.findById(id).populate("owner");    
}

PostSchema.createNewPost = (requestObject) =>{    
  const post = new PostSchema(requestObject)
  return PostSchema.savePost(post);
}

PostSchema.savePost = (requestObject) => requestObject.save();

PostSchema.findPostByIdAndDelete = (requestObject)=> PostSchema.findByIdAndDelete(requestObject);

PostSchema.findPostDetail = (objects) => {
  return PostSchema.findOne(objects.conditionObject).select(objects.fields)
};

module.exports = PostSchema;