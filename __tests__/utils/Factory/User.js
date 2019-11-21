const faker = require('faker')
const { factory } = require('factory-girl')
const User = require('../../../src/App/Models/UserModel')

class Factory {
  constructor () {
    factory.define('User', User, {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      is_email_verified:true,
      status:true,
      reset_password_token:null
    });
    return factory;
  }
}

module.exports = new Factory();
