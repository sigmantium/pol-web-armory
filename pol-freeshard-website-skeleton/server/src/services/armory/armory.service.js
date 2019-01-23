// Initializes the `armory` service on path `/armory`
const createService = require('./armory.class.js');
const hooks = require('./armory.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/armory', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('armory');

  service.hooks(hooks);
};
