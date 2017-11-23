const { expect } = require('chai');

const app = require('../../src/app');

describe('"users" service', () => {

  it('registered the service', () => {
    expect( app.service('users') ).to.be.ok;
  });

});
