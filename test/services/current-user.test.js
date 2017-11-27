const { expect } = require('chai'),
  HttpStatus = require('http-status-codes');

const app = require('../../src/app');

describe('"current-user" service', () => {

  let api;
  before(() => api = app.get('apiClient'));

  it('registered the service', () => {
    expect( app.service('users') ).to.be.ok;
  });

  let userToken;

  // Login user
  describe('login user', () => {

    it('login user', async () => {
      const res = await api.post('/authentication', {
        strategy: 'local',
        email: 'user1@mail.com',
        password: 'abc123'
      });

      expect(res.status).to.be.eq(HttpStatus.CREATED);

      const data = res.data;
      expect(data).to.be.an('object').that.has.keys('accessToken', 'user');
      expect(data.user).to.be.an('object').that.has.keys('id', 'firstName', 'lastName', 'email');

      // Save token
      userToken = data.accessToken;
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
        headers: api.tokenize(userToken)
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
        headers: api.tokenize(userToken)
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

    it('refuse deleting user if incorrect password', async () => {
      try {
        await api.delete('current-user', {
          headers: api.tokenize(userToken)
        });
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.FORBIDDEN);
      }
    });

    it('delete user', async () => {
      const res = await api.delete('current-user?password=abc123', {
        headers: api.tokenize(userToken)
      });
      expect(res.status).to.be.eq(HttpStatus.OK);
    });

  }); 

});
