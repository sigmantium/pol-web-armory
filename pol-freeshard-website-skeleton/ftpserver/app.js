// Native libraries
const fs = require('fs');
const filecompare = require('filecompare');

// External libraries
const FtpSrv = require('ftp-srv');
const ftpServer = new FtpSrv('ftp://localhost:21');
//const MongoClient = require('mongodb').MongoClient;

// Needed files
const neededFiles = [
    "pcs.txt",
    "pcequip.txt"
];

// Event on the FTP server
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

                    // test data that is compared. I've copied them and changed test1.txt by purpose.
                    var path1 = '../JSONParser/test.txt';
                    var path2 = '../JSONParser/test1.txt';

                    var cb = function(isEqual)  {
                        console.log("equal? :" + isEqual);

                        // Starting the parser if the text-files is equal.
                        if(isEqual){
                            startParser();
                            // Compare the parsed JSON with the existing collection in the MongoDB
                           // modifyCollections();
                        }else{
                            console.log("The files isn't equal");
                        }
                        
                    }
                    filecompare(path1,path2,cb);

                    
                    
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

// Event on the FTP server
ftpServer.on('client-error', ({ context, error }) => console.error(`FTP server error: error interfacing with client ${context} ${error} on ftp://localhost:21 ${JSON.stringify(error)}`)); 

// Listener on the FTP server
ftpServer.listen().then(() => console.log('Server running at ftp://localhost:21'));

// Check if all files are received
function allFilesReceived() {
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

// Start the POL-generated data to JSON-parser
function startParser() {
    console.log('Starting the parser...');
}

// ModifyCollections
function modifyCollections() {
    
    MongoClient.connect("mongodb://localhost:27017/armory_backend", (err, db) => {
        
        if (err) { 
            // If error = collection not found, then create collection 
        }

        // Loop through parsedJSON file. Get element by character-serial

        // Find and update existing element with same character-serial if exists, otherwise create new record

    });
    
}