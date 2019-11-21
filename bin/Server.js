require('dotenv')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../api_doc_configuration/swagger')
const app = require('../src/App')
/**
 * @class Server
 * @description start a server and api doc
 */
class Server {
  constructor () {
    const port = process.env.PORT || 3000
    // use swagger-Ui-express for your app documentation endpoint
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    //app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.listen(port)
        
    if (process.env.NODE_ENV === 'dev') {
      console.log('Listening on port ' + port)
    }
  }
}

module.exports = new Server()
