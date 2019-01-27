const characterservice = require('./characterservice/characterservice.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(characterservice);
};
