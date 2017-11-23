const { expect } = require('chai');

const app = require('../../src/app');

describe('"ping" service', () => {

  let api;
  before(() => api = app.get('apiClient'));

  it('registered the service', () => {
    expect( app.service('ping') ).to.be.ok;
  });

  it('return "PONG"', async () => {
    const res = await api.get('ping');
    expect(res.data).to.be.eq('PONG');
  });

});
