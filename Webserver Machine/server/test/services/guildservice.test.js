const assert = require('assert');
const app = require('../../src/app');

describe('\'guildservice\' service', () => {
  it('registered the service', () => {
    const service = app.service('guildservice');

    assert.ok(service, 'Registered the service');
  });
});
