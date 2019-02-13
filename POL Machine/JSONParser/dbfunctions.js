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
        await collection.insertOne({ 
            $set: { 
            'accounts': data.accounts,
            'guildcount': data.guildcount,
            'itemcount': data.itemcount,
            'mobilecount': data.mobilecount,
            'onlinecount': data.onlinecount,
            'polversion': data.polversion,
            'serverload': data.serverload,
            'uptime': data.uptime
            }
        }, { upsert: true }, (err, res) => {
    
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
                'name': elem.name,
                'gender': elem.gender,
                'race': elem.race,
                'title_guild': elem.title_guild,
                'title_prefix': elem.title_prefix,
                'title_suffix': elem.title_suffix,
                'title_race': elem.title_race,
                'guild': elem.guild,
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
                'abbr': elem.abbr,
                'charter': elem.charter,
                'color': elem.color,
                'faction': elem.faction,
                'master': elem.master,
                'name': elem.name,
                'stone': elem.stone,
                'type': elem.type,
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