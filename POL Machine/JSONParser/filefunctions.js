const fs = require('fs');
const concat = require('concat-files');

class FileFunctions {
    static filesExists(filePath) {
        return fs.existsSync(filePath);
    }

    static mergeFiles(file1,file2, destination){
        return new Promise((resolve) => {
            concat([file1,file2], destination, function(err) {
                if(err) throw err
                resolve();
            });
          })
    }
}

module.exports = FileFunctions;