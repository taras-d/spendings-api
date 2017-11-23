module.exports = function (app) {

  class PingService {
    async find() {
      return 'PONG';
    }
  }

  app.use('/ping', new PingService());
};
