const axios = require('axios');

const app = require('../src/app');

before(function(done) {

  const { port, host } = app.settings;

  this.server = app.listen(port);
  this.server.once('listening', async () => {

    // Clear database before tests
    await app.get('sequelizeClient').truncate();

    // Save api client for next tests
    app.set('apiClient', axios.create({ baseURL: `http://${host}:${port}` }));

    done();
  });
});

after(function(done) {
  this.server.close(done);
});
