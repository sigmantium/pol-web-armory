const assert = require('assert');
const app = require('../../src/app');

describe('\'testservice\' service', () => {
  it('registered the service', () => {
    const service = app.service('testservice');

    assert.ok(service, 'Registered the service');
  });
});
