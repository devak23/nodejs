const assert = require('chai').assert;
const app = require('../app');

describe('App', () => {
    "use strict";
   it ('App should return Hello', () => {
       assert.equal(app(), 'hello');
   })
});