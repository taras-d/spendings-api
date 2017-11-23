const { expect } = require('chai');

const app = require('../../src/app');

describe('"users" service', () => {

  let api;
  before(() => api = app.get('apiClient'));

  it('registered the service', () => {
    expect( app.service('users') ).to.be.ok;
  });

  // Create user
  describe('create user', () => {

    const user = {
      firstName: 'Test', 
      lastName: 'User 1',
      email: 'testUser1@mail.com', 
      password: 'abc123'
    };

    it('create user', async () => {

      const res = await api.post('/users', user);

      expect(res.status).to.be.eq(201);
      expect(res.data).to.be.an('object').that.has.keys(
        'id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt'
      );
    });

    it('refuse creating user if email alredy exist', async () => {
      try {
        await api.post('/users', user);
      } catch (err) {
        expect(err.response.status).to.be.eq(400);
      }
    });

  });

  // Login user
  describe('login user', () => {

    it('login user', async () => {

      const res = await api.post('/authentication', {
        strategy: 'local',
        email: 'testUser1@mail.com',
        password: 'abc123'
      });

      expect(res.status).to.be.eq(201);

      const data = res.data;
      expect(data).to.be.an('object').that.has.keys('accessToken', 'user');
      expect(data.user).to.be.an('object').that.has.keys(
        'id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt'
      );
    });

    it('refuse login user if email or password incorrect', async () => {
      try {
        await api.post('/authentication', {
          strategy: 'local',
          email: 'nobody@mail.com',
          password: 'no-matter'
        });
      } catch (err) {
        expect(err.response.status).to.be.eq(401);
      }
    });
      
  });

});
