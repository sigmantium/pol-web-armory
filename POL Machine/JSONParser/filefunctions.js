const config = require('./config.json');
const fs = require('fs');
const concat = require('concat-files');

class FileFunctions {
    
    static RequiredFilesReceived() {
        const neededFiles = config.files;
        for (let i = 0; i < neededFiles.length; i++) 
            if (neededFiles[i].required && !this.filesExists('./data/' + neededFiles[i].filename))
                return false;
            
        return true;
    }
    
    static filesExists(filePath) {
        return fs.existsSync(filePath);
    }

    static mergeFiles(file1,file2, destination){
        concat([file1,file2], destination, function(err) {
            if(err) throw err
            console.log('done');
        });
    }
}

module.exports = FileFunctions;