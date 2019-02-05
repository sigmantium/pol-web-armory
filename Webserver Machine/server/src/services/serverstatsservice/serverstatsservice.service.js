// Initializes the `serverstatsservice` service on path `/serverstatsservice`
const createService = require('feathers-mongoose');
const createModel = require('../../models/serverstatsservice.model');
const hooks = require('./serverstatsservice.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/serverstatsservice', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('serverstatsservice');

  service.hooks(hooks);
};
