const faker = require('faker')
const Post = require('../../src/App/Models/PostModel')

class Populate {
  async posts (quantity) {
    let posts = []

    for (let i = 0; i < quantity; i++) {
      let post = await Post.create({
        title: faker.name.title(),
        description: faker.name.jobDescriptor(),
        owner:"5dc299b19f9ba7388e57a066" //faker.random.alphaNumeric(24) //Mongoose.Schema.ObjectId
      })

      posts = [...posts, post]
    }

    return posts
  }
}
module.exports = new Populate()
