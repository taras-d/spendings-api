const { expect } = require('chai'),
  HttpStatus = require('http-status-codes');

const app = require('../../src/app'),
  utils = require('../utils');

describe('"current-user" service', () => {

  let api, user;
    
  before(async () => {
    api = app.get('apiClient');
    user = await utils.createTestUser(api);
  });

  it('registered the service', () => {
    expect( app.service('users') ).to.be.ok;
  });

  // Get user
  describe('get user', () => {
    
    it('refuse getting user if token failed', async () => {
      try {
        await api.get('current-user', {});
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.UNAUTHORIZED);
      }
    });

    it('get user', async () => {
      const res = await api.get('current-user', {
        headers: api.tokenize(user.accessToken)
      });
      
      expect(res.status).to.be.eq(HttpStatus.OK);
      
      const data = res.data;
      expect(data).to.be.an('object').that.has.keys('id', 'firstName', 'lastName', 'email');
    });

  });

  // Update user
  describe('update user', () => {

    it('refuse updating user if token failed', async () => {
      try {
        await api.patch('current-user', {});
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.UNAUTHORIZED);
      }
    });

    it('update user', async () => {
      const res = await api.patch('current-user', { firstName: 'Mike' }, {
        headers: api.tokenize(user.accessToken)
      });
      
      expect(res.status).to.be.eq(HttpStatus.OK);
      
      const data = res.data;
      expect(data).to.be.an('object').that.has.keys('id', 'firstName', 'lastName', 'email');
      expect(data.firstName).to.be.eq('Mike');
    });

  });

  // Delete user
  describe('delete user', () => {

    it('refuse deleting user if token failed', async () => {
      try {
        await api.delete('current-user');
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.UNAUTHORIZED);
      }
    });

    it('refuse deleting user if incorrect password?password=333', async () => {
      try {
        await api.delete('current-user', {
          headers: api.tokenize(user.accessToken)
        });
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.FORBIDDEN);
      }
    });

    it('delete user', async () => {
      const res = await api.delete('current-user?password=abc123', {
        headers: api.tokenize(user.accessToken)
      });
      expect(res.status).to.be.eq(HttpStatus.OK);
    });

  }); 

});
