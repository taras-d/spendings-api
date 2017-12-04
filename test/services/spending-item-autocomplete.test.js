const assert = require('assert');
const app = require('../../src/app');

describe('\'spending-item-autocomplete\' service', () => {
  it('registered the service', () => {
    const service = app.service('spending-item-autocomplete');

    assert.ok(service, 'Registered the service');
  });
});
