const CONSTANTS = require("../Config/app.constants")
/**
 * @class APIResponse
 * @method successResponse,errorResponse
 * @description errorResponse for error response format and successResponse for success response format
 */
class APIResponse {
  successResponse(response){
    response.status = true;
    response.data = response.data ? response.data : {};
    response.message = response.message ? response.message:{};        
    return response;
  }
  errorResponse(response){    
    response.status = false;    
    response.data = response.data ? response.data : {};
    if(response.message.code === CONSTANTS.UNIQUE_INDEX){
      response.errors = {error:{message:CONSTANTS.MESSAGES.USER_EXIST}}
    }else if(response.message.errors){
      response.errors = response.message.errors;
    }else{
      response.validation_fail = response.message
    }
    delete response.message;
    return response;
  }
}
module.exports = new APIResponse();