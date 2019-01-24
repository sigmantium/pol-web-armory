

module.exports = {
  before: {
    all: [],
    find: [
      (context) => {
        console.log('[Testservice] Find method triggered in the backend');
      }
    ],
    get: [
      (context) => {
        console.log('[Testservice] Get method triggered in the backend');
      } 
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
