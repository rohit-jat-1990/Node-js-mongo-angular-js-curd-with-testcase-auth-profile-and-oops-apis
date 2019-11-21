const request = require('supertest')
const App = require('../../src/App')
const Trucate = require('../utils/Trucate');
const FactoryUser = require('../utils/Factory/User')
const CONSTANTS = require('../../src/Config/app.constants');

describe('Test File Upload:', () => {
  var token;
  afterAll( async () => {
    await Trucate.users();    
  });

  beforeAll( done => {
    Trucate.users(); 
    FactoryUser.create('User', {
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

  it('Should upload a file', async ()=> {
    const response = await request(App)
      .post(`${CONSTANTS.API_VERSION_V1}${CONSTANTS.API_ROUTES.FILE_UPLOAD}`)
      .set('Authorization', `Bearer ${token}`)
      .attach('profile_image', './images/kamal.jpg')
      
      expect(response.status).toBe(200)      
    });
});

