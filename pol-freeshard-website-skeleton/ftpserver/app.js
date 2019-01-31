// Native libraries
const fs = require('fs');
const filecompare = require('filecompare');

// External libraries
const FtpSrv = require('ftp-srv');
const ftpServer = new FtpSrv('ftp://localhost:21');
//const MongoClient = require('mongodb').MongoClient;


// Needed files
const neededFiles = [
    { incomingFile: 'pcs_pcequip.txt', oldFile: 'old_pcs_pceequip.txt', collectionname: 'characterservices', necessary: true },
    { filename: 'serverInfo.txt', oldFile: 'old_serverInfo.txt', collectionname: 'servercollection', necessary: false } // General info about the server
];

// Event on the FTP server
ftpServer.on('login', ({ connection, username, password}, resolve, reject) => {
    
    if (!checkLoginCredentials(username, password)) {
        return reject(new Error("Bad username or password"));
    }

    // Listen to incoming files
    connection.on('STOR', (error, filename) => {
        // Check if theres an error
        if (error) return;

        // Check if all files received
        if (!checkAllFilesReceived()) {
            return;
        }

        // Loop through all necessary files
        for (let i = 0; i < neededFiles.length; i++) {
            if (neededFiles[i].necessary) {
                switch(compareFiles(neededFiles[i].incomingFile, neededFiles[i].oldFile)) {
                    case 1: // No old file exists, create new mongodb collection and insert JSON document
                        createMongoCollection(neededFiles[i].incomingFile, neededFiles[i].collectionname);
                        break; 
                    case 2: // new and old file exists, compared and there is difference. Upload differences to the mongo db collection
                        updateMongoCollection(neededFiles[i].incomingFile, neededFiles[i].collectionname);
                        break; 
                    case 3: break; // new and old file exists, compared and no difference. Do nothing. Add logging later...
                    default: break; // Error
                }
            }
        }

    });

    return resolve();
});

// Event on the FTP server
ftpServer.on('client-error', ({ context, error }) => console.error(`FTP server error: error interfacing with client ${context} ${error} on ftp://localhost:21 ${JSON.stringify(error)}`)); 

// Listener on the FTP server
ftpServer.listen().then(() => console.log('Server running at ftp://localhost:21'));

// Check login credentials
function checkLoginCredentials(username, password) {
    return (username === 'test' && password === 'test');
}

function compareFiles(incomingFile, oldFile) {
    if (!filesExists('./' + oldFile)) 
        return 1;

    const isEqual = filecompare(incomingFile, oldFile, (isEqual) => (isEqual) ? 3 : 2 );

    return isEqual;
}

// Check if all files are received
function checkAllFilesReceived() {
    for (let i = 0; i < neededFiles.length; i++) {
        if (!filesExists('./' + neededFiles[i])) 
            return false;
    }

    return true;
}

// Check if all files exists
function filesExists(filePath) {
    return fs.existsSync(filePath);
}

function createMongoCollection(filename, collectionname) {

}

function updateMongoCollection(filename, collectionname) {

}

// Start the POL-generated data to JSON-parser
function startParser() {
    console.log('Starting the parser...');
}

// ModifyCollections
function modifyCollections() {
    
    /** 
    MongoClient.connect("mongodb://localhost:27017/armory_backend", (err, db) => {
        
        if (err) { 
            // If error = collection not found, then create collection 
        }

        // Loop through parsedJSON file. Get element by character-serial

        // Find and update existing element with same character-serial if exists, otherwise create new record

    });
    */
//}