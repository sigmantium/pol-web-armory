const assert = require('assert');
const app = require('../../src/app');

describe('\'characterservice\' service', () => {
  it('registered the service', () => {
    const service = app.service('characterservice');

    assert.ok(service, 'Registered the service');
  });
});
