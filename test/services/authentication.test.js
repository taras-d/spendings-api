const { expect } = require('chai'),
  HttpStatus = require('http-status-codes');

const app = require('../../src/app');

describe('"authentication" service', () => {

  let api;
  before(() => api = app.get('apiClient'));

  it('registered the service', () => {
    expect( app.service('authentication') ).to.be.ok;
  });

  // Login user
  describe('login user', () => {

    it('login user', async () => {
      const res = await api.post('/authentication', {
        strategy: 'local',
        email: 'john.doe@mail.com',
        password: 'abc123'
      });

      expect(res.status).to.be.eq(HttpStatus.CREATED);

      const data = res.data;
      expect(data).to.be.an('object').that.has.keys('accessToken', 'user');
      expect(data.user).to.be.an('object').that.has.keys('id', 'firstName', 'lastName', 'email');
    });

    it('refuse login user if email or password incorrect', async () => {
      try {
        await api.post('/authentication', {
          strategy: 'local',
          email: 'nobody@mail.com',
          password: 'no-matter'
        });
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.UNAUTHORIZED);
      }
    });
      
  });

});