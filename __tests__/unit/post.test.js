const request = require('supertest')

const App = require('../../src/App')
const Trucate = require('../utils/Trucate')
const FactoryUser = require('../utils/Factory/User')
const CONSTANTS = require('../../src/Config/app.constants');
const Populate = require('../utils/Populate')

describe('Test Post APIS', () => {
  var token;
  var post_id; 
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
  afterAll( async () => {
    await Trucate.users();
    await Trucate.posts();    
  })

  it('should create post', async ()=> {  
      const response = await request(App)
      .post(`${CONSTANTS.API_VERSION_V1}${CONSTANTS.API_ROUTES.POST}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Rohitash Singh mohan',
        description: "Lorem 2 mohan is a modern, minimalist, no-nonsense lorem impsum generator",
        owner:"5dcbe0909a1e8e4ffd963ae4"
      })
      expect(response.body).toHaveProperty("data");
      post_id = response.body.data.post._id;
  });

  it('should get post by id', async () => {
    const response = await request(App)
      .get(`${CONSTANTS.API_VERSION_V1}${CONSTANTS.API_ROUTES.POSTS}/${post_id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
  });

  it('should get list of posts', async done => {
    await Populate.posts(3)
    const response = await request(App)
    .get(`${CONSTANTS.API_VERSION_V1}${CONSTANTS.API_ROUTES.POSTS}`)
    .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    done()
  });

  it('should update a post', async () => {
    const response = await request(App)
      .put(`${CONSTANTS.API_VERSION_V1}${CONSTANTS.API_ROUTES.UPDATE_POST_TEST}/${post_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Rohitash UPdated',
        description: "Lorem 2 is a modern, minimalist, no-nonsense lorem impsum Updayted"
      })

    expect(response.status).toBe(200)
  });

  it('should delete a post', async () => {
    const response = await request(App)
      .delete(`${CONSTANTS.API_VERSION_V1}${CONSTANTS.API_ROUTES.DELETE_POST_TEST}/${post_id}`)
      .set('Authorization', `Bearer ${token}`)
      
    expect(response.status).toBe(200)
  });
})
