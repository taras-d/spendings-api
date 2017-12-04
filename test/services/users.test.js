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
        firstName: 'John',  lastName: 'Doe',
        email: 'john.doe@mail.com', password: 'abc123'
      });

      expect(res.status).to.be.eq(HttpStatus.CREATED);

      const data = res.data;
      expect(data).to.be.an('object').that.has.keys('firstName', 'lastName', 'email');
    });

    it('refuse creating user if email alredy exist', async () => {
      try {
        await api.post('/users', {
          firstName: 'J',  lastName: 'D',
          email: 'john.doe@mail.com', password: 'abc123'
        });
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.BAD_REQUEST);
      }
    });

  });

});