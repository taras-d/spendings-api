const assert = require('assert');
const app = require('../../src/app');

describe('\'ping\' service', () => {
  it('registered the service', () => {
    const service = app.service('ping');

    assert.ok(service, 'Registered the service');
  });
});
