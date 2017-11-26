const axios = require('axios');

const app = require('../src/app');

before(function(done) {
  const { port, host } = app.settings;

  this.server = app.listen(port);
  this.server.once('listening', async () => {

    // Clear database before tests
    await app.get('sequelizeClient').truncate();

    // Create api client
    const api = axios.create({ baseURL: `http://${host}:${port}` });
    api.tokenize = function(token) {
      return Object.assign({}, this.defaults.headers, {
        Authorization: `Bearer ${token}`
      });
    };

    // Save api client for next tests
    app.set('apiClient', api);

    done();
  });
});

after(function(done) {
  this.server.close(done);
});
