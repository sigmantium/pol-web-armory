const config = require('./config.json');
const fs = require('fs');


class FileFunctions {

    constructor() {}

    static RequiredFilesReceived() {
        const neededFiles = config.files;
        for (let i = 0; i < neededFiles.length; i++) {
            if (neededFiles[i].required && !filesExists('./' + neededFiles[i].filename)) {
                console.log('Failed to find file: ' + neededFiles[i].filename);
                return false;
            }
        }

        return true;
    }

    filesExists(filePath) {
        return fs.existsSync(filePath);
    }
}

module.exports = FileFunctions;
