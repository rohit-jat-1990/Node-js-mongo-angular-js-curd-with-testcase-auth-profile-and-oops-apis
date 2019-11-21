const express = require('express')

const UserController = require('../App/Controllers/UserController')
const SessionController = require('../App/Controllers/SessionController')
const AuthMiddleware = require('../App/Middlewares/Authenticate')
const FileUploadController = require('../App/Controllers/FileUploadController')
const FileUploadInDbMiddleware = require('../App/Middlewares/FileUploadInDb')
const FileUploadInDirbMiddleware = require('../App/Middlewares/FileUploadInDirectory')
const UnlinkFileMiddleware = require('../App/Middlewares/UnlinkFile')
const PostController = require('../App/Controllers/PostController')
const CONSTANTS = require('../Config/app.constants')
/**
 * @class Routes
 * @method publicRoutes,privateRoutes
 * @description privateRoutes for private routes and publicRoutes for public routes
 */
class Routes {
  publicRoutes () {
    const routes = express.Router()
    routes.post(CONSTANTS.API_ROUTES.LOGIN, SessionController.store) // LOGIN        
    routes.post(CONSTANTS.API_ROUTES.USER_REGISTER, UserController.store) // REGISTER    
    routes.put(CONSTANTS.API_ROUTES.VERIFY_EMAIL, UserController.verifyEmail) // VERIFY EMAIL
    routes.post(CONSTANTS.API_ROUTES.FORGOT_PASSWORD, UserController.forgotPassword) // FORGOT PASSWORD
    routes.put(CONSTANTS.API_ROUTES.RESET_PASSWORD, UserController.resetPassword) // RESET YOUR PASSWORD    
    routes.get(CONSTANTS.API_ROUTES.GET_PROFILE_IMAGE, FileUploadController.getProfileImage) // GET PROFILE IMAGE AS LINK
    
    return routes
  }

  privateRoutes () {
    const routes = express.Router()
    routes.use(AuthMiddleware.verifyToken) // MIDDLEWARE TO VERIFY TOKEN
    routes.get(CONSTANTS.API_ROUTES.LOGOUT, SessionController.logout) // LOGOUT A USER
    routes.get(CONSTANTS.API_ROUTES.LOGOUT_ALL, SessionController.logoutAll) // LOGOUT FROM ALL
    routes.get(CONSTANTS.API_ROUTES.USER_ME, UserController.profile) // GET PROFILE
    routes.put(CONSTANTS.API_ROUTES.USER_ME, UserController.update) // UPDATE PROFILE
    routes.get(CONSTANTS.API_ROUTES.GET_USER_BY_ID, UserController.show) // GET USER BY ID AND FETCH ALL POSTS
    routes.post(CONSTANTS.API_ROUTES.CHANGE_PASSWORD, UserController.changePassword) // CHANGE YOUR PASSWORD
    routes.post(CONSTANTS.API_ROUTES.FILE_UPLOAD_IN_DB, FileUploadInDbMiddleware, FileUploadController.fileUploadInDb,FileUploadController.customError) // FILE UPLOAD IN DB
    routes.post(CONSTANTS.API_ROUTES.FILE_UPLOAD_IN_DIR, UnlinkFileMiddleware.unLinkFile,FileUploadInDirbMiddleware, FileUploadController.fileUploadInDirectory,FileUploadController.customError) // FILE UPLOAD IN DIRECTORY
    
    //POST ROUTE
    routes.post(CONSTANTS.API_ROUTES.POST, PostController.store) // POST A POST
    routes.get(CONSTANTS.API_ROUTES.GET_POSTS_BY_ID, PostController.show) // GET A POST BY ID
    routes.get(CONSTANTS.API_ROUTES.POSTS, PostController.index) // GET ALL POSTS
    routes.put(CONSTANTS.API_ROUTES.UPDATE_POST, PostController.update) // UPDATE A POST
    routes.delete(CONSTANTS.API_ROUTES.DELETE_POST, PostController.delete) // DELETE A POST

    routes.get(CONSTANTS.API_ROUTES.APP, (req, res) => {
      res.send({
        app: CONSTANTS.APP
      })
    })

    return routes
  }
}

module.exports = new Routes()
