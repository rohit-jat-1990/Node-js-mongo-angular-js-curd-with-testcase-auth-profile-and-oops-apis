const CONSTANTS = require('./app.constants');
/**
 * @class Secret
 * @method getSecret
 * @description get secret key from constant file
 */
class Secret {
  constructor () {
    this._secret = CONSTANTS.SECRET
  }

  getSecret () {
    return this._secret
  }
}

module.exports = new Secret()
