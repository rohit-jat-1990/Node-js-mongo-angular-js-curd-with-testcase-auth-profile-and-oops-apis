const request = require('supertest')
const App = require('../../src/App')
const Trucate = require('../utils/Trucate');
const CONSTANTS = require('../../src/Config/app.constants');

describe('Test user signup and verify email:', () => {
  var token;
  afterAll( async () => {
    await Trucate.users();    
  })

  it('should created a user', async () => {
    const response = await request(App)
      .post(`${CONSTANTS.API_VERSION_V1}${CONSTANTS.API_ROUTES.USER_REGISTER}`)
      .send({
        name: 'Rohitash Singh',
        email: 'rohtash005@yopmail.com',
        password: 'Test@123'
      })

    expect(response.body).toHaveProperty("data")
    token = response.body.data.token;
  });

  it('should verify the email', async () => {
    response = await request(App)
      .put(`${CONSTANTS.API_VERSION_V1}${CONSTANTS.API_ROUTES.VERIFY_EMAIL}`)      
      .send({
        token: token        
      })
      expect(response.status).toBe(200)      
  })

  // it('should send forgot email and return success', async () => {
  //   response = await request(App)
  //     .post(`${CONSTANTS.API_VERSION_V1}${CONSTANTS.API_ROUTES.FORGOT_PASSWORD}`)      
  //     .send({
  //       email: "rohtash005@yopmail.com"
  //     })
  //     expect(response.status).toBe(200)      
  // })

  // it('should reset password', async () => {
  //   response = await request(App)
  //     .put(`${CONSTANTS.API_VERSION_V1}${CONSTANTS.API_ROUTES.RESET_PASSWORD}`)      
  //     .send({
  //       new_password: "Test@1234",
  //       confirm_password: "Test@1234",
  //       token:token
  //     })
  //     expect(response.status).toBe(200)      
  // })

  // it('should return public profile image', async () => {
  //   response = await request(App)
  //     .get(`${CONSTANTS.API_VERSION_V1}${CONSTANTS.API_ROUTES.GET_PROFILE_IMAGE}/{shdfkjhsdkffsdfsdsdfdsf}`)      
  //     expect(response.body).toBe("data.user")            
  // })

})
