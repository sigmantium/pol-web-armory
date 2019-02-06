const characterservice = require('./characterservice/characterservice.service.js');
const guildservice = require('./guildservice/guildservice.service.js');
const playerservice = require('./playerservice/playerservice.service.js');
const serverstatsservice = require('./serverstatsservice/serverstatsservice.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(characterservice);
  app.configure(guildservice);
  app.configure(playerservice);
  app.configure(serverstatsservice);
};
