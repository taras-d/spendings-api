const { expect } = require('chai');

const app = require('../../src/app');

describe('"spendings" service', () => {

  it('registered the service', () => {
    expect( app.service('spendings') ).to.be.ok;
  });

});
