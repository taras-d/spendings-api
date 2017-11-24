const { expect } = require('chai'),
  HttpStatus = require('http-status-codes');

const app = require('../../src/app');

let api, 
  user1, 
  user1Spending,
  user2,
  user2Spending;

const createTestUser = async number => {
  const data = {
    firstName: 'Test', lastName: `User ${number}`,
    email: `testUser${number}@mail.com`, password: 'abc123'
  };

  await api.post('users', data);

  return (await api.post('authentication', {
    strategy: 'local', email: data.email, password: data.password
  })).data;
}

describe('"spendings" service', () => {

  before(async () => {
    api = app.get('apiClient');
    user1 = await createTestUser(3);
    user2 = await createTestUser(4);
  });

  it('registered the service', () => {
    expect( app.service('spendings') ).to.be.ok;
  });

  // Create spending
  describe('Create spending', () => {

    it('Refuse creating spending if token invalid', async () => {
      try {
        await api.post('spendings', {
          date: new Date(), items: []
        });
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.UNAUTHORIZED);
      }
    });

    it('Create spending', async () => {
      const res = await api.post('spendings', {
        date: new Date(),
        items: [
          { name: 'Food', cost: 67 },
          { name: 'Other', cost: 32.67 }
        ]
      }, {
        headers: api.addToken(user1.accessToken)
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
  describe('Get spendings', () => {

    it('Refuse getting spendings if token failed', async () => {
      try {
        await api.get('spendings');
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.UNAUTHORIZED);
      }
    });

    it('Get array of spendings', async () => {
      const res = await api.get('spendings', {
        headers: api.addToken(user1.accessToken)
      });

      expect(res.status).to.be.eq(HttpStatus.OK);

      const data = res.data;
      expect(data).to.be.an('object').that.has.keys('total', 'skip', 'limit', 'data');
      expect(data.total).to.be.a('number').that.eq(1);
      expect(data.skip).to.be.a('number').that.eq(0);
      expect(data.limit).to.be.a('number').that.eq(10);
      expect(data.data).to.be.an('array').that.has.length(1);
    });

    it('Get single spending', async () => {
      const res = await api.get(`spendings/${user1Spending.id}`, {
        headers: api.addToken(user1.accessToken)
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
  describe('Update spending', () => {
    
    it('Refuse updating spending if token failed', async () => {
      try {
        await api.patch(`spendings/${user1Spending.id}`, {
          date: new Date()
        });
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.UNAUTHORIZED);
      }
    });

    it('Refuse updating spending if not owner', async () => {
      user2Spending = (
        await api.post('spendings', { date: new Date() }, {
          headers: api.addToken(user2.accessToken)
        })
      ).data;

      try {
        await api.patch(`spendings/${user2Spending.id}`, {}, {
          headers: api.addToken(user1.accessToken)
        });
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.FORBIDDEN);
      }
    });

    it('Update spending', async () => {
      const res = await api.patch(`spendings/${user1Spending.id}`, {
        date: new Date(), items: [{ name: 'Bus', cost: 4 }]
      }, {
        headers: api.addToken(user1.accessToken)
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
  describe('Delete spending', () => {
    
    it('Refuse deleting spending if token failed', async () => {
      try {
        await api.delete(`spendings/${user1Spending.id}`);
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.UNAUTHORIZED);
      }
    });

    it('Refuse deleting spending if not owner', async () => {
      try {
        await api.delete(`spendings/${user2Spending.id}`, {
          headers: api.addToken(user1.accessToken)
        });
      } catch (err) {
        expect(err.response.status).to.be.eq(HttpStatus.FORBIDDEN);
      }
    });

    it('Delete spending', async () => {
      const res = await api.delete(`spendings/${user1Spending.id}`, {
        headers: api.addToken(user1.accessToken)
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
