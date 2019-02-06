// Initializes the `playerservice` service on path `/playerservice`
const createService = require('feathers-mongoose');
const createModel = require('../../models/playerservice.model');
const hooks = require('./playerservice.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/playerservice', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('playerservice');

  service.hooks(hooks);
};
