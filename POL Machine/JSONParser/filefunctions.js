const fs = require('fs');

class FileFunctions {
    static filesExists(filePath) {
        return fs.existsSync(filePath);
    }
}

module.exports = FileFunctions;