const fs = require('fs');
const concat = require('concat-files');



/**
* Class Description Title
* @class FileFunctions
* @classdesc Function class that handles both merging of files and check if fileExists
*/
class FileFunctions {

    /**
    * Check if file exists.
    * @method FileFunctions#fileExists
    * @static
    * @param {any} filePath the path to the file to be checked if it exists.
    */
    static filesExists(filePath) {
        return fs.existsSync(filePath);
    }

    /**
    * Merge two files into one.
    * @method FileFunctions#mergeFiles
    * @static
    * @param {any} file1 the path to the first file
    * @param {any} file2 the path to the second file.
    * @param {any} destination path to where the two files should be added to one.
    * @returns {Promise} Promise object represents the concat.
    */
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