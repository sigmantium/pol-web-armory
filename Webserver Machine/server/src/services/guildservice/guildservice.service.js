// Initializes the `guildservice` service on path `/guildservice`
const createService = require('feathers-mongoose');
const createModel = require('../../models/guildservice.model');
const hooks = require('./guildservice.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/guildservice', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('guildservice');

  service.hooks(hooks);
};
