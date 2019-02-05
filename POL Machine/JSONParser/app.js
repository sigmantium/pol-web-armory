// Native libraries
const config = require('./config.json');
const FileFunctions = require('./filefunctions');
const JSONParser = require('./jsonparser');
const MongoDB = require('./dbfunctions');
const ftpsrv = require('ftp-srv');

// Create an instance of the FTP server
const ftpserver = new ftpsrv('ftp://' + config.ftp.host + ':' + config.ftp.port);

// Event on the FTP server
ftpserver.on('login', ({ connection, username, password}, resolve, reject) => {
    
    resolve({root: './data'});
    
    if (username !== config.ftp.username || password !== config.ftp.password) {
        reject(new Error('Bad username or password.'));   
    }

    // Listen to incoming files
    connection.on('STOR', async (error, filename) => {
        // Check if theres an error
        if (error) return;

        // Check if all files received
        if (!FileFunctions.RequiredFilesReceived()) {
            console.log('Not all files received.');
            return;
        }

        // Inform the developer
        console.log('All files received!');

        // Parse the data files into JSON
        await JSONParser.StartJSONParser();

        // Upload changes to MongoDB
        await MongoDB.UploadJSON();
    });

    return resolve();
});

// Event on the FTP server
ftpserver.on('client-error', ({ context, error }) => console.error(`FTP server error: error interfacing with client ${context} ${error} ${JSON.stringify(error)}`)); 

// Listener on the FTP server
ftpserver.listen().then(() => console.log('Server running at ftp://' + config.ftp.host + ':' + config.ftp.port));
