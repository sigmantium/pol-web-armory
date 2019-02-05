const assert = require('assert');
const app = require('../../src/app');

describe('\'serverstatsservice\' service', () => {
  it('registered the service', () => {
    const service = app.service('serverstatsservice');

    assert.ok(service, 'Registered the service');
  });
});
