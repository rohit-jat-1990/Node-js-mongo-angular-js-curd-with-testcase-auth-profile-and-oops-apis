require('dotenv')
const mongoose = require('mongoose')
const CONSTANTS = require('../Config/app.constants')
/**
 * @class Database
 * @method connection
 * @description class for setup connection with DB
 */
class Database {
  connection () {
    mongoose.connect(process.env.MONGO_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology:true
    })

    mongoose.set('useCreateIndex', true)    
    mongoose.Promise = global.Promise

    if (process.env.NODE_ENV === CONSTANTS.DEV) {
      mongoose.connection.on(
        'error',
        console.error.bind(console,CONSTANTS.MESSAGES.DATABASE_NOT_FOUND)
      )
    }
  }
}

module.exports = new Database()
