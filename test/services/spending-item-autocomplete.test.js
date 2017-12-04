const { expect } = require('chai'),
  HttpStatus = require('http-status-codes');

const app = require('../../src/app'),
  utils = require('../utils');

describe('"spending-item-autocomplete service', () => {

  it('registered the service', () => {
    expect( app.service('spending-item-autocomplete') ).to.be.ok;
  });
  
  describe('autocomplete', () => {

    let api, user;
    
    before(async () => {
      api = app.get('apiClient');
      user = await utils.createTestUser(api);

      await api.post('/spendings', {
        date: new Date(),
        items: [
          { name: 'Shopping', cost: 235 },
          { name: 'Lunch', cost: 56 },
          { name: 'Laundry', cost: 89 }
        ]
      }, {
        headers: api.tokenize(user.accessToken)
      });
    });

    it('refuse autocomplete if token failed', async () => {
      try {
        await api.get('spending-item-autocomplete');
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.UNAUTHORIZED);
      }
    });

    it('autocomplete ""', async () => {
      const res = await api.get('spending-item-autocomplete', {
        headers: api.tokenize(user.accessToken)
      });

      expect(res.status).to.be.eq(HttpStatus.OK);
      expect(res.data).to.be.an('array').that.has.members( ['Shopping', 'Lunch', 'Laundry'] );
    });

    it('autocomplete "Sh"', async () => {
      const res = await api.get('spending-item-autocomplete?search=Sh', {
        headers: api.tokenize(user.accessToken)
      });

      expect(res.status).to.be.eq(HttpStatus.OK);
      expect(res.data).to.be.an('array').that.has.members( ['Shopping'] );
    });

    it('autocomplete "L"', async () => {
      const res = await api.get('spending-item-autocomplete?search=L', {
        headers: api.tokenize(user.accessToken)
      });

      expect(res.status).to.be.eq(HttpStatus.OK);
      expect(res.data).to.be.an('array').that.has.members( ['Lunch', 'Laundry'] );
    });

  });

});
