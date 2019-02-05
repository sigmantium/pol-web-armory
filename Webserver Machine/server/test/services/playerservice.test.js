const assert = require('assert');
const app = require('../../src/app');

describe('\'playerservice\' service', () => {
  it('registered the service', () => {
    const service = app.service('playerservice');

    assert.ok(service, 'Registered the service');
  });
});
