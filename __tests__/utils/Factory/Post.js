const faker = require('faker')
const { factory } = require('factory-girl')
const Post = require('../../../src/App/Models/PostModel')

class Factory {
  constructor () {
    factory.define('Post', Post, {
      title: faker.name.title(),
      description: faker.name.jobDescriptor(),
      owner:"5dcbe0909a1e8e4ffd963ae4"
    });
    return factory;
  }
}

module.exports = new Factory();
