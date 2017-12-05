const { expect } = require('chai'),
  HttpStatus = require('http-status-codes');

const app = require('../../src/app'),
  utils = require('../utils');

describe('"spendings" service', () => {

  let api, 
    user1, 
    user1Spending,
    user2,
    user2Spending;

  before(async () => {
    api = app.get('apiClient');
    user1 = await utils.createTestUser(api);
    user2 = await utils.createTestUser(api);
  });

  it('registered the service', () => {
    expect( app.service('spendings') ).to.be.ok;
  });

  // Create spending
  describe('create spending', () => {

    it('refuse creating spending if token invalid', async () => {
      try {
        await api.post('spendings', { date: new Date(), items: [] });
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.UNAUTHORIZED);
      }
    });

    it('create spending', async () => {
      const res = await api.post('spendings', {
        date: new Date(),
        items: [
          { name: 'Food', cost: 67 },
          { name: 'Other', cost: 32.67 }
        ]
      }, {
        headers: api.tokenize(user1.accessToken)
      });

      expect(res.status).to.be.eq(HttpStatus.CREATED);

      const data = res.data;
      expect(data).to.be.an('object').that.has.keys('id', 'date', 'sum', 'items');
      expect(data.id).to.be.a('string');
      expect(data.date).to.be.a('string');
      expect(data.sum).to.be.a('number').that.eq(99.67);
      expect(data.items).to.be.an('array').that.has.length(2);

      user1Spending = data;
    });

  });

  // Get spendings
  describe('get spendings', () => {

    it('refuse getting spendings if token failed', async () => {
      try {
        await api.get('spendings');
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.UNAUTHORIZED);
      }
    });

    it('get list of spendings', async () => {
      const res = await api.get('spendings', {
        headers: api.tokenize(user1.accessToken)
      });

      expect(res.status).to.be.eq(HttpStatus.OK);

      const data = res.data;
      expect(data).to.be.an('object').that.has.keys('total', 'totalSum', 'skip', 'limit', 'data');
      expect(data.total).to.be.a('number').that.eq(1);
      expect(data.totalSum).to.be.a('number').that.eq(99.67);
      expect(data.skip).to.be.a('number').that.eq(0);
      expect(data.limit).to.be.a('number').that.eq(10);
      expect(data.data).to.be.an('array').that.has.length(1);
    });

    it('get single spending', async () => {
      const res = await api.get(`spendings/${user1Spending.id}`, {
        headers: api.tokenize(user1.accessToken)
      });

      expect(res.status).to.be.eq(HttpStatus.OK);

      const data = res.data;
      expect(data).to.be.an('object').that.has.keys('id', 'date', 'sum', 'items');
      expect(data.id).to.be.a('string');
      expect(data.date).to.be.a('string');
      expect(data.sum).to.be.a('number').that.eq(99.67);
      expect(data.items).to.be.an('array').that.has.length(2);
    });

  });

  // Update spending
  describe('update spending', () => {
    
    it('refuse updating spending if token failed', async () => {
      try {
        await api.patch(`spendings/${user1Spending.id}`, {
          date: new Date()
        });
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.UNAUTHORIZED);
      }
    });

    it('refuse updating spending if not owner', async () => {
      user2Spending = (
        await api.post('spendings', { date: new Date() }, {
          headers: api.tokenize(user2.accessToken)
        })
      ).data;

      try {
        await api.patch(`spendings/${user2Spending.id}`, {}, {
          headers: api.tokenize(user1.accessToken)
        });
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.FORBIDDEN);
      }
    });

    it('update spending', async () => {
      const res = await api.patch(`spendings/${user1Spending.id}`, {
        date: new Date(), items: [{ name: 'Bus', cost: 4 }]
      }, {
        headers: api.tokenize(user1.accessToken)
      });

      expect(res.status).to.be.eq(HttpStatus.OK);

      const data = res.data;
      expect(data).to.be.an('object').that.has.keys('id', 'date', 'sum', 'items');
      expect(data.id).to.be.a('string');
      expect(data.date).to.be.a('string');
      expect(data.sum).to.be.a('number').that.has.eq(4);
      expect(data.items).to.be.an('array').that.has.length(1);
    });

  });

  // Delete spending
  describe('delete spending', () => {
    
    it('refuse deleting spending if token failed', async () => {
      try {
        await api.delete(`spendings/${user1Spending.id}`);
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.UNAUTHORIZED);
      }
    });

    it('refuse deleting spending if not owner', async () => {
      try {
        await api.delete(`spendings/${user2Spending.id}`, {
          headers: api.tokenize(user1.accessToken)
        });
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.FORBIDDEN);
      }
    });

    it('delete spending', async () => {
      const res = await api.delete(`spendings/${user1Spending.id}`, {
        headers: api.tokenize(user1.accessToken)
      });

      expect(res.status).to.be.eq(HttpStatus.OK);

      const data = res.data;
      expect(data).to.be.an('object').that.has.keys('id', 'date', 'sum');
      expect(data.id).to.be.a('string');
      expect(data.date).to.be.a('string');
      expect(data.sum).to.be.a('number').that.has.eq(4);
    });

  });

});
