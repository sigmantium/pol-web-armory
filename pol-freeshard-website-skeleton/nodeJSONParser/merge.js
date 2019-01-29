var concat = require('concat-files');

concat([
    'pcs.txt','pcequip.txt'], 'test.txt', function(err){
      if(err) throw err
      console.log('done');
    });