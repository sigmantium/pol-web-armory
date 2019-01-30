const FtpSrv = require('ftp-srv');

const ftpServer = new FtpSrv('ftp://localhost:21');

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

                // Wait untill all files are uploaded, then start the parser.
                let files = [];
                const neededFiles = ['pcs.txt', 'pcequip.txt'];
                
                // Add new filename to array
                files.push(fileName);

                // Check if all files are received
                const allFilesReceived = neededFiles.every(filename => {
                    console.log('Adding filename: ' + filename);
                    files.includes(filename);
                });

                if (allFilesReceived) {
                    // Start parse the files
                    console.log('Start parse the files!');

                    // Empty array
                    files = [];
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