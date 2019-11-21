const User = require('../../src/App/Models/UserModel')
const Post = require('../../src/App/Models/PostModel')

class Trucate {
  async users () {
    await User.deleteMany()
  }
  async posts () {
    await Post.deleteMany()
  }
}

module.exports = new Trucate()
