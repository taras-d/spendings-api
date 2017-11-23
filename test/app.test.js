const axios = require('axios');

const app = require('../src/app');

before(function(done) {

  if (process.env.NODE_ENV !== 'test') {
    console.warn(
      'Tests can be run only in "test" environment. ' +
      'Check "process.env.NODE_ENV" variable.'
    );
    process.exit();
  }

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
