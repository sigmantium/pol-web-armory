const concat = require('concat-files');

concat(['pcs.txt','pcequip.txt'], 'test.txt', err => {
  if(err) throw err;

  console.log('done');
});