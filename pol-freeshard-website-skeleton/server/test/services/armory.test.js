const assert = require('assert');
const app = require('../../src/app');

describe('\'armory\' service', () => {
  it('registered the service', () => {
    const service = app.service('armory');

    assert.ok(service, 'Registered the service');
  });
});
