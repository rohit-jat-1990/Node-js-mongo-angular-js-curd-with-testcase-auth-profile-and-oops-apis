const request = require('supertest')

const App = require('../../src/App')
const Trucate = require('../utils/Trucate')
const Factory = require('../utils/Factory/User')
const CONSTANTS = require('../../src/Config/app.constants');

describe('Some Auth Required API', () => {

  var token;
  beforeAll( done => {
    Trucate.users(); 
    Factory.create('User', {
        is_email_verified:true,
        status:true,    
        password: 'Test@123',
        email:"rohtash@yopmail.com"
      });
    request(App)
    .post(`${CONSTANTS.API_VERSION_V1}${CONSTANTS.API_ROUTES.LOGIN}`)
      .send({
        password: 'Test@123',
        email:"rohtash@yopmail.com"
      })
      .end((err,response)=>{
        if (err) {
          return done(err);
        }
        expect(response.body).toHaveProperty('data.token')        
        token = response.body.data.token;
        done();
      })
  });

  afterAll( async () => {
    await Trucate.users();    
  })

  it('should return user profile', async () => {
      let response = await request(App)
                          .get(`${CONSTANTS.API_VERSION_V1}${CONSTANTS.API_ROUTES.USER_ME}`)
                          .set('Authorization', `Bearer ${token}`)      
                          expect(response.body).toHaveProperty('data.user.name')                            
    })

   it('should update a password', async () => {
    let response = await request(App)
      .post(`${CONSTANTS.API_VERSION_V1}${CONSTANTS.API_ROUTES.CHANGE_PASSWORD}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        current_password: 'Test@123',
        new_password: 'Test@1234',
        confirm_password: 'Test@1234',
      })

    expect(response.status).toBe(200)
  }) 
  
  it('should not be able to access private routes without jwt token', async () => {
    const response = await request(App).get(`${CONSTANTS.API_VERSION_V1}/${CONSTANTS.API_ROUTES.APP}`)

    expect(response.status).toBe(401)
  })

})
