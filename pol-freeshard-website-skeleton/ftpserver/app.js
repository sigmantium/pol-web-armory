
const config = require('./config.json');
const FileFunctions = require('./filefunctions');
const JSONParser = require('./jsonparser');
const ftpsrv = require('ftp-srv');

// Create an instance of the FTP server
const ftpserver = new ftpsrv('ftp://' + config.ftp.host + ':' + config.ftp.port);

// Event on the FTP server
ftpserver.on('login', ({ connection, username, password}, resolve, reject) => {
    
    if (username !== config.ftp.username || password !== config.ftp.password) {
        return reject(new Error("Bad username or password"));
    }

    // Listen to incoming files
    connection.on('STOR', (error, filename) => {
        // Check if theres an error
        if (error) return;

        // Check if all files received
        /*if (!FileFunctions.RequiredFilesReceived()) {
            console.log('Not all files received.');
            return;
        }*/

        console.log('All files received!');
        JSONParser.StartJSONParser();
    });

    return resolve();
});

// Event on the FTP server
ftpserver.on('client-error', ({ context, error }) => console.error(`FTP server error: error interfacing with client ${context} ${error} ${JSON.stringify(error)}`)); 

// Listener on the FTP server
ftpserver.listen().then(() => console.log('Server running at ftp://' + config.ftp.host + ':' + config.ftp.port));