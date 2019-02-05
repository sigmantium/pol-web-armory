const config = require('./config.json');
const fs = require('fs');

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
}

module.exports = FileFunctions;