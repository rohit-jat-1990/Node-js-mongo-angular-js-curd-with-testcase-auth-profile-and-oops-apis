/**
 * @constant app.constants
 * @description here we have define constants for all the string literal which would use in our project
 */
const pdf = ['pdf'], image = ['jpeg', 'png', 'jpg', 'gif'];
const API = "api";
const VERSION = "v1";
const APP = 'app';
const CONSTANTS = {
    API_VERSION_V1: `/${API}/${VERSION}`,    
    EMAIL_FORM_NAME:"Test Singh",
    EMAIL_FROM_EMAIL:"xyz@yopmail.com",
    DEV:"dev",
    LOGGER_FORMAT:':method :url Status: :status ResponseBodyLength: :res[content-length] - ResponseTime: :response-time ms : [:date[web]]',
    COMBINED:'combined',
    APP:APP,
    API:API,
    VERSION:VERSION,
    PRODUCTION:"production",
    TEST:"test",
    IMG_DESTINATION: 'images',
    SECRET:'ab681ab35f8f6ee19b2c119406982b56',    
    AUTHORIZATION_STRING:"Bearer ",
    MEDIA_UPLOAD_LIMIT: 5,
    PDF: pdf,
    IMAGE: image,    
    ALLOW_MEDIA: pdf.concat(image),
    RESIZE_WIDTH:250,
    RESIZE_HEIGHT:250,
    HASH_NUMBER:8,
    JWT_TOKEN_EXPIRE_IN:"1h",
    UNIQUE_INDEX:11000,
    MAX_FILE_SIZE:1000000,
    FILE_EXTENSION_MATCH:/\.(jpg|JPG|png)$/,
    ORIGINAL:"./original",
    IMAGE_DIRECTORY_PATH:"images",
    API_STATUS_CODES: {
        SUCCESS: 200,        
        NO_CONTENT:204,
        NOT_MODIFIED: 304,
        BAD_REQUEST:400,
        UNAUTHORIZED: 401,
        FOR_BIDDEN: 403,        
        NOT_FOUND: 404,
        REQUEST_TIMEOUT: 408,
        CONFLICT: 409,
        FILE_NOT_UPLOADED: 413,        
        VALIDATION_FAIL:422,
        INTERNAL_SERVER_ERROR: 500,
        MAIL_FAIL:535
    },
    API_ROUTES: {
        LOGIN:"/sessions",
        USER_REGISTER:"/users",
        VERIFY_EMAIL:"/users/verify-email",
        FORGOT_PASSWORD:"/users/forgot-password",
        RESET_PASSWORD:"/users/reset-password",
        GET_PROFILE_IMAGE:"/users/get-profile-image/:id/:avatar",
        LOGOUT:"/sessions/logout",
        LOGOUT_ALL:"/sessions/logout-all",
        USER_ME:"/users/me",
        CHANGE_PASSWORD:"/users/change-password",
        FILE_UPLOAD_IN_DB:"/uploads/file-upload-in-db",
        FILE_UPLOAD_IN_DIR:"/uploads/file-upload-in-directory",
        APP:APP,        
        POST:"/posts",
        POSTS:"/posts",
        GET_POSTS_BY_ID:"/posts/:id",
        GET_USER_BY_ID:"/users/:id",
        UPDATE_POST:"/posts/update/:id",
        UPDATE_POST_TEST:"/posts/update",
        DELETE_POST:"/posts/:id",
        DELETE_POST_TEST:"/posts",
    },
    MESSAGES: {
        PLEASE_SET_EMAIL_CONFIG:"Please set email configuration.",
        DATABASE_NOT_FOUND:"Mongo database not found. Please confirm weather your mongo service is running or not.",
        REQUIRED:"This field is required.",
        EMAIL_INVALID:"Email is not valid.",
        PASSWORD_ERROR:'Password cannot contain "password".',
        REGISTER_EMAIL:"You have successfully register with us. Please verify your email.Thanks!",
        USER_EXIST:"A user already exists with this email address",
        EMAIL_VERIFIED:"Thanks for verifying your email. Please login with us.",
        EMAIL_ALREADY_VERIFIED:"Email already verified.",
        FILE_UPLOADED:"File has been uploaded.",
        FILE_NOT_UPLOADED:"File failed to upload.",
        USER_NOT_FOUND:"User does not exist.",
        EMAIL_NOT_VERIFY:"You have not verify your email yet! Please verify your email.",
        INVALID_PASSWORD:"Password is not valid.",
        PROVIDE_VALID_EMAIL:"Please provide valid email.",
        USER_EMAIL_NOT_FOUND:"No user found with that email address.",
        ALLOW_MEDIA:"Please upload JPG|PNG file extension image.",
        LINK_INVALID:"Email verification link is not valid.",
        LINK_EXPIRED:"Email verification link has been expired.",
        CURRENT_PASSWORD_N_MATCH:"Current password does not match.",
        NEW_CONFIRM_PASSWORD_NOT_MATCH:"New password and confirm password does not match.",
        PASSWORD_CHANGED:"Your password has been changed.",
        NO_TOKEN:"Please provide valid token.",
        INVALID_TOKEN:"Your token is not valid",
        VALID_KEY:"Please provide valid key.",
        UPDATE_REQUIRED_FIELDS:"Please update required fields only.",
        EMAIL_NOT_FOUND:"This email is not register with us. Please provide valid email.",
        TOKEN_EXPIRED:"Token has been expired.",
        NEED_TO_VERIFY_EMAIL:"You have not verify your email address, kindly check your INBOX and verify your email then reset your password.",
        MAKE_SURE_EMAIL_CONFIG:"Make sure your email configuration is correct.",
        POST_CREATED:"Post has been created.",
        POST_NOT_EXIST:"Post does not exist with this ID.",
        POST_UPDATED:"Post has been updated.",
        POST_NOT_DELETE:"Post has not been deleted.",
        POST_DELETED:"Post has been deleted.",
        PROFILE_UPDATED:"Your profile has been updated."
    },
    EMAIL_SUBJECTS:{
        EMAIL_VERIFICATION:"Email Verification",
        FORGOT_PASSWORD_SUBJECT:"Reset your account password",
        RESET_LINK_MSG:"To reset email, Link has been sent to your email address."
    },
    EMAIL_CONFIG: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'abc@yopmail.com',
          pass: '12345678'
        }
    },
    VALIDATIONS: {        
        PASSWORD_MIN_LENGTH:8
    }
};
module.exports = CONSTANTS;




