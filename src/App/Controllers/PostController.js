const Post = require('../Models/PostModel')
const APIResponseClass = require('../../Services/APIResponseClass')
const CONSTANTS = require('../../Config/app.constants');
/**
 * @class PostController
 * @method store,show,index,update,delete
 * @description controller for create, update, read and delete a post
 */
class PostController {
  async store(req, res) { // POST A POST        
    try {
      const requestObject = {...req.body,owner:req.user._id};
      const post = await Post.createNewPost(requestObject);
      return res.send(APIResponseClass.successResponse({ 
          data:{post},
          message:CONSTANTS.MESSAGES.POST_CREATED
        }))
    } catch (error) {
      return res.status(CONSTANTS.API_STATUS_CODES.VALIDATION_FAIL).send(
        APIResponseClass.errorResponse({message:error.message}))
    }
  }
  async show(req, res) { // GET A POST BY ID
    try {
      const post = await Post.findByIdAndPopulateOwner(req.params.id);      
      return res.send(APIResponseClass.successResponse({ 
          data:{post},
          message:""
        }))
    } catch (error) {
      return res.status(CONSTANTS.API_STATUS_CODES.VALIDATION_FAIL).send(
        APIResponseClass.errorResponse({message:error.message}))
    }
  }

  async index(req, res) { // GET ALL POSTS
    try {
      const post = await Post.findAllPosts();      
      return res.send(APIResponseClass.successResponse({ 
          data:{post},
          message:""
        }))
    } catch (error) {
      return res.status(CONSTANTS.API_STATUS_CODES.VALIDATION_FAIL).send(
        APIResponseClass.errorResponse({message:error.message}))
    }
  }

  async update(req, res) { // UPDATE A POST
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['title', 'description']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))    
        if (!isValidOperation) {
          throw new Error(CONSTANTS.MESSAGES.UPDATE_REQUIRED_FIELDS);          
        }
        const fields = "title description";
        const postObjects = {conditionObject:{ _id:req.params.id,owner:req.user._id },fields};
        const post = await Post.findPostDetail(postObjects);
        
        updates.forEach((update) => post[update] = req.body[update])
        await Post.savePost(post);
        
        return res.send(APIResponseClass.successResponse({ 
            data:{post},
            message:CONSTANTS.MESSAGES.POST_UPDATED
          }))
      } catch (error) {        
        return res.status(CONSTANTS.API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(
          APIResponseClass.errorResponse({message:error.message}))      
      }
  }

  async delete(req, res) { // DELETE A POST
    try {
        const post = await Post.findPostByIdAndDelete({_id:req.params.id,owner:req.user._id});
        if(!post){
          throw new Error(CONSTANTS.MESSAGES.POST_NOT_EXIST);           
        }
        return res.send(APIResponseClass.successResponse({ 
            data:{},
            message:CONSTANTS.MESSAGES.POST_DELETED
          }))
      } catch (error) {        
        return res.status(CONSTANTS.API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(
          APIResponseClass.errorResponse({message:error.message}))      
      }
  }
  
}
module.exports = new PostController()
