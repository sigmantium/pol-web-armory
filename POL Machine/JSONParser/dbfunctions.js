const config = require('./config.json');
const fs = require('fs');
const FileFunctions = require('./filefunctions');
const MongoClient = require('mongodb').MongoClient;

class MongoDB {

    // Constructor
    MongoDB() {
        this.db = null;
    }
    
    // Connect to the database
    async connect() {
        try {
            this.db = await MongoClient.connect('mongodb://' + config.database.host + ':' + config.database.port, { useNewUrlParser: true });
            console.log("Connected to db");
            return this.db;
        } catch (e) {
            return e;
        }
    }

    // Get Singleton instance
    async getInstance() {
        try {
            return (this.db != null) ? db : await this.connect();
        } catch (e) {
            return e;
        }
    }

    // Update server statistics
    static async UpdateServerStats(data) {
        const database = this.getInstance();
        const collection = await database.collection('serverstatsservice', (err, res) => {
            if (err) throw err;
        });

        // Update server stats
        await collection.findOneAndUpdate({ 'id': 1 }, { $set: { 
            'id': 1,
            'accounts': data.accounts,
            'guildcount': data.guildcount,
            'itemcount': data.itemcount,
            'mobilecount': data.mobilecount,
            'onlinecount': data.onlinecount,
            'polversion': data.polversion,
            'serverload': data.serverload,
            'uptime': data.uptime
        }}, { upsert: true }, (err, res) => {
    
        if (err) throw err;
        });
    }

    // Update server statistics
    static async UpdateOnlinePlayers(data) {
        const database = this.getInstance();
        const collection = await database.collection('onlineplayerservice', (err, res) => {
            if (err) throw err;
        });

        data.forEach(async (elem) => {
            await collection.findOneAndUpdate({ 'serial': elem.serial }, { $set: { 
                'name': elem.accounts,
                'gender': elem.guildcount,
                'race': elem.itemcount,
                'title_guild': elem.mobilecount,
                'title_prefix': elem.onlinecount,
                'title_suffix': elem.polversion,
                'title_race': elem.serverload,
                'guild': elem.uptime,
                'murderer': elem.murderer
            }}, { upsert: true }, (err, res) => {

            if (err) throw err;

            console.log('Updated record: ' + elem.Serial);
            });
        });
    }

    static async UpdateGuilds(data) {
        const database = this.getInstance();
        const collection = await database.collection('guildsservice', (err, res) => {
            if (err) throw err;
        });

        data.forEach(async (elem) => {
            await collection.findOneAndUpdate({ 'guildid': elem.guildid }, { $set: { 
                'abbr': elem.accounts,
                'charter': elem.guildcount,
                'color': elem.itemcount,
                'faction': elem.mobilecount,
                'master': elem.onlinecount,
                'name': elem.polversion,
                'title_race': elem.serverload,
                'stone': elem.uptime,
                'type': elem.murderer,
                'website': elem.website,
                'members': elem.members,
                'allies': elem.allies,
                'enemies': elem.enemies
            }}, { upsert: true }, (err, res) => {

            if (err) throw err;

            console.log('Updated record: ' + elem.Serial);
            });
        });
    }

    static async UploadJSON() {
        const database = this.getInstance();
        const collection = await database.collection(config.files.collectionname, (err, res) => {
            if (err) throw err;
        });
        
        // Get all the data
        const data = JSON.parse(fs.readFileSync('./data/' + config.files.parsedFilename));
        
        // Iterate through all the data and insert it into mongo
        data.forEach(async (elem) => {
            await collection.findOneAndUpdate({ 'serial': elem.Serial }, { $set: { 
                    'account': elem.Account,
                    'name': elem.Name,
                    'stats': elem.stats,
                    'skills': elem.skills,
                    'equipment': elem.equipment
                }}, { upsert: true }, (err, res) => {
            
                if (err) throw err;

                console.log('Updated record: ' + elem.Serial);
            });

            console.log('Done updating all records!');
        });
    }

}

module.exports = new MongoDB();