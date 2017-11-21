class Service {

  async find() {
    return 'PONG';
  }
  
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
