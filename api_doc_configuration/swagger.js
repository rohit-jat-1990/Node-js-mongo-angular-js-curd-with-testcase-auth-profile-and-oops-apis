const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'My NodeJS Assignment', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'This is NodeJS Assignment APIS doc', // short description of the app
  },
  host: 'localhost:3000', // the host or url of the app
  basePath: '/api-docs', // the basepath of your endpoint
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./api_docs/**/*.yaml'],
};
// initialize swagger-jsdoc
module.exports = swaggerJSDoc(options);