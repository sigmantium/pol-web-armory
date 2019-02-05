const config = require('./config.json');
const fs = require('fs');
const FileFunctions = require('./filefunctions');
const MongoClient = require('mongodb').MongoClient;

class MongoDB {
    
    static async UploadJSON() {

        MongoClient.connect('mongodb://' + config.database.host + ':' + config.database.port, { useNewUrlParser: true }, async (err, client) => {
        
            if (err) throw err; 
    
            console.log('Connected!');
    
            const database = await client.db(config.database.dbname);
    
            // Files to parse
            const neededFiles = config.files;
            for (let i = 0; i < neededFiles.length; i++) {
                if (neededFiles[i].required && FileFunctions.filesExists('./data/' + neededFiles[i].parsedFilename)) {
                    if (neededFiles[i].parsedFilename === 'pcs_pcequip.json') {
                        this.parseCharacterCollection(database, neededFiles[i].parsedFilename, neededFiles[i].collectionname);
                    } else if (neededFiles[i].filename === 'serverinfo.json') {
                        this.parseServerInfoCollection(database, neededFiles[i].parsedFilename, neededFiles[i].collectionname);
                    }
                }
            }

        });

    }

    static async parseCharacterCollection(database, filename, collectionname) {
        // Check if collection exists
        const collection = await database.collection(collectionname, (err, res) => {   
            if (err) throw err; // Database does not exist
        });

        var jsonData = JSON.parse(fs.readFileSync('./data/' + filename));

        jsonData.forEach(async (obj)  => {

            // Find element in mongo, if it doesnt exist, create it, otherwise change it
            await collection.findOneAndUpdate({ 'serial': obj.Serial }, { 
                $set: { 
                    'account': obj.Account,
                    'name': obj.Name,
                    'stats': obj.stats,
                    'skills': obj.skills,
                    'equipment': obj.equipment
                }}, { upsert: true }, (err, res) => {
                if (err) throw err;

                console.log('Updated record: ' + obj.Serial);
            });
            
        });

        console.log('Done updating all records!');
    }

    static async parseServerInfoCollection(database, filename, collectionname) {
        // Check if collection exists
        const collection = await database.collection(collectionname, (err, res) => {   
            if (err) throw err; // Database does not exist
        });

        const jsonFile = await fs.promises.readFile('./data/' + filename);
        const jsonData = JSON.parse(jsonFile);

        jsonData.forEach(async (e)  => {
            // Compare if json entry is same as document, if not update
            console.log('Trying to update: ' + e);
            
            // Find element in mongo, if it doesnt exist, create it, otherwise change it
            await collection.findOneAndUpdate({ 'serial': e }, { 
                $set: { 
                    'account': 'testaccount',
                    'name': 'updatedname',
                    'stats': stats,
                    'skills': skills,
                    'equipment': equipment
                }}, { upsert: true }, (err, res) => {
                if (err) throw err;

                console.log('Updated record: ' + e);
            });
            
        });
    }
    
}

module.exports = MongoDB;
