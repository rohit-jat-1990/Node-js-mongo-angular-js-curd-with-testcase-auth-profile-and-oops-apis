require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
}) //Dotenv is a zero-dependency module that loads environment variables

const express = require('express')
const cors = require('cors') // using "Cross Origin Resource Sharing" handle Cross domain requests
const cookieParser = require('cookie-parser') // providing simple cookie parsing functionality for signed cookie or not signed cookie
const logger = require('morgan') // it generates logs automatically.

const Database = require('./Database/Database')
const Routes = require('./Routes/Routes')
const CONSTANTS = require('./Config/app.constants')
const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, 'log', 'debug.log');

/**
 * @class App
 * @description initializing express, mongoDb connection, middleware logger and routea
 */
class App {
  constructor () {
    this.app = express()

    this.database()
    this.middlewares()
    this.routes()
      
  }

  database () { // make connection
    Database.connection()
  }

  middlewares () { // setup middleware
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true })) //If extended is true, means you can post "nested object"
    this.app.use(logger(CONSTANTS.LOGGER_FORMAT)); // DISPLAY LOG ON TERMINAL
    if (fs.existsSync(logPath)) { // WRITE LOGS ON DEBUG.LOG FILE
      this.app.use(logger(CONSTANTS.LOGGER_FORMAT,{
        stream: fs.createWriteStream(logPath, {flags:'a'})
      }))
    } else { // WRITE LOGS ON DEBUG.LOG FILE
      fs.mkdirSync(path.dirname(logPath));
      fs.writeFileSync(logPath, {flags:'wx'});
      this.app.use(logger(CONSTANTS.LOGGER_FORMAT,{
      stream: fs.createWriteStream(logPath, {flags:'a'})
      }));
    }
    this.app.use(cookieParser())
    this.app.use(cors())
  }

  routes () { // setup routes
    this.app.use(CONSTANTS.API_VERSION_V1, Routes.publicRoutes())
    this.app.use(CONSTANTS.API_VERSION_V1, Routes.privateRoutes())
  }
}

module.exports = new App().app
