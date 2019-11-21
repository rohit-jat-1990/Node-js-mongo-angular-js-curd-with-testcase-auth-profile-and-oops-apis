# Node-js-mongo-angular-js-curd-with-testcase-auth-profile-and-oops-apis-nodejs
## For git clone :- in your project directory structure use command below

### `git clone GIT_URL`

## Other Scripts

Use npm to install dependencies..<br>

### `npm install`

Runs the app in the development mode.<br>

### `npm run dev`

Runs all test cases.<br>

### `npm run test`

View API documentation.<br>

Open [http://localhost:3000/api-docs]

View in browser.<br>

open [http://localhost:3000] to view it in the browser.

## NOTES
## supertest :- SuperTest works with any test framework, here is an example without using any test framework at all
## Example
##    const request = require('supertest');
##    const express = require('express');
##    
##    const app = express();
##    
##    app.get('/user', function(req, res) {
##    res.status(200).json({ name: 'john' });
##    });
##    
##    request(app)
##    .get('/user')
##    .expect('Content-Type', /json/)
##    .expect('Content-Length', '15')
##    .expect(200)
##    .end(function(err, res) {
##        if (err) throw err;
##    });


## Faker :- we can generate fake data

## factory-girl :- factory-girl is a factory library for Node.js. It works asynchronously and supports associations and the use of functions for generating attributes.

## jest :- JEST is one of the most popular frameworks that is maintained regularly by Facebook. It is a preferred framework for the React based applications as it requires zero configuration.

## after run project via npm rn dev open web browser and run http://localhost:3000/api-docs/ swagger will open 

## Run swagger http://localhost:3000/api-docs/
## Node-js-mongo-angular-js-curd-with-testcase-auth-profile-and-oops-apis
