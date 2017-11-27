const { expect } = require('chai'),
  HttpStatus = require('http-status-codes');

const app = require('../../src/app');

describe('"users" service', () => {

  let api;
  before(() => api = app.get('apiClient'));

  it('registered the service', () => {
    expect( app.service('users') ).to.be.ok;
  });

  // Create user
  describe('create user', () => {
    
    it('create user', async () => {
      const res = await api.post('/users', {
        firstName: 'User 1',  lastName: 'User 1',
        email: 'user1@mail.com', password: 'abc123'
      });

      expect(res.status).to.be.eq(HttpStatus.CREATED);
    });

    it('refuse creating user if email alredy exist', async () => {
      try {
        await api.post('/users', {
          firstName: '123',  lastName: '456',
          email: 'user1@mail.com', password: '789'
        });
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.BAD_REQUEST);
      }
    });

  });

});