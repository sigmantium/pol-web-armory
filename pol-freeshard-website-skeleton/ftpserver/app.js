const FtpSrv = require('ftp-srv');
const fs = require('fs');
const ftpServer = new FtpSrv('ftp://localhost:21');

const neededFiles = [
    "pcs.txt",
    "pcequip.txt"
];

ftpServer.on('login', ({ connection, username, password}, resolve, reject) => {
    if (username === 'test' && password === 'test') {
        // Successful login
        console.info('User: ' + username + 'successfully logged on.');
        
        // Handle incoming files
        connection.on('STOR', (error, fileName) => { 
            if (error) {
                console.error(`FTP server error: could not receive file ${fileName} for upload ${error}`); 
            } else {
                console.info(`FTP server: upload successfully received - ${fileName}`); 

                if (allFilesReceived()) {
                    console.log('ALL FILES RECEIVED!');
                    // Start the parsing process
                } else {
                    console.log('Still missing files...');
                }
            }
        });

        return resolve("Login succeeded")
    } else {
        // Log to logfile later...
        console.warn('User entered wrong login credentials.');
        return reject(new Error("Bad username or password"));
    }  
});

ftpServer.on('client-error', ({ context, error }) => { 
    console.error(`FTP server error: error interfacing with client ${context} ${error} on ftp://localhost:21 ${JSON.stringify(error)}`); 
}); 

ftpServer.listen().then(() => console.log ('Server running at ftp://localhost:21'));

function allFilesReceived() {
    for (let i = 0; i < neededFiles.length; i++) {
        if (!fileExists('./' + neededFiles[i])) 
            return false;
    }

    return true;
}

function fileExists(filePath) {
    return fs.existsSync(filePath);
}