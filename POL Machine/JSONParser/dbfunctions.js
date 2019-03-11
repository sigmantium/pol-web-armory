// config file.
const config = require('./config.json');

// NPM packages.
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

class MongoDB {

    /**
    * Class Description Title
    * @class MongoDB
    * @classdesc MongoDB adapter class
    * @hideconstructor
    */
    constructor() {
        
    }

    /**
    * Inserts the server statistic into mongoDB database.
    * @method MongoDB#UpdateServerStats
    * @static
    * @async
    * @param {any} data the data that is needed to be added to the database
    */
    static async UpdateServerStats(data) {
        MongoClient.connect('mongodb://' + config.database.host + ':' + config.database.port, { useNewUrlParser: true }, async (err, db) => {

            if (err) throw err;

            const dbo = db.db(config.database.dbname);
            const d = new Date();
            dbo.collection('serverstatsservices').insertOne({
                'accounts': data.accounts,
                'guildcount': data.guildcount,
                'itemcount': data.itemcount,
                'mobilecount': data.mobilecount,
                'onlinecount': data.onlinecount,
                'polversion': data.polversion,
                'serverload': data.serverload,
                'uptime': data.uptime,
                'uploaded': d
            }, { upsert: true }, (err, res) => {
                if (err) throw err;
            });

            db.close();
        });
    }

        /**
    * Inserts current online players into mongoDB database.
    * @method MongoDB#UpdateOnlinePlayers
    * @static
    * @async
    * @param {any} data the data that is needed to be added to the database
    */
    static async UpdateOnlinePlayers(data) {
        // Insert all data into array.
        let onlinePlayers = data.map(elem => elem.serial);
        let toBeDeleted = [];

        MongoClient.connect('mongodb://' + config.database.host + ':' + config.database.port, { useNewUrlParser: true }, async (err, db) => {
            if (err) throw err;

            const dbo = db.db(config.database.dbname);
            data.forEach((elem) => {
                dbo.collection('playerservices').findOneAndUpdate({ 'serial': elem.serial }, {
                    $set: {
                        'name': elem.name,
                        'gender': elem.gender,
                        'race': elem.race,
                        'title_guild': elem.title_guild,
                        'title_prefix': elem.title_prefix,
                        'title_suffix': elem.title_suffix,
                        'title_race': elem.title_race,
                        'guild': elem.guild,
                        'murderer': elem.murderer
                    }
                }, {
                    upsert: true
                }, (err, res) => {
                    if (err) throw err;
                });
            });

            // Get the current documents from "inventory" collection".
            const res = await dbo.collection("playerservices").find({}).toArray();

            // Iterate through res array and see if res element exists in deleteArray
            res.forEach((elem) => {
                if (!onlinePlayers.includes(elem.serial) || (onlinePlayers.length == 0 || onlinePlayers === undefined)) {
                    toBeDeleted.push(elem);
                }
            });

            // Iterate through toBeDeleted and delete it from collection.
            toBeDeleted.forEach((elem) => {
                dbo.collection("playerservices").findOneAndDelete({ 'serial': elem.serial });
            });

            // closing db-connection.
            db.close();
        });

    }

           /**
    * Inserts current active guilds into mongoDB database.
    * @method MongoDB#UpdateGuilds
    * @static
    * @async
    * @param {any} data the data that is needed to be added to the database
    */
    static async UpdateGuilds(data) {
        let activeGuilds = data.map(elem => elem.guildid);
        let toBeDeleted = [];

        MongoClient.connect('mongodb://' + config.database.host + ':' + config.database.port, { useNewUrlParser: true }, async (err, db) => {
            if (err) throw err;

            const dbo = db.db(config.database.dbname);
            data.forEach(async (elem) => {
                dbo.collection('guildservices').findOneAndUpdate({ 'guildid': elem.guildid }, {
                    $set: {
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
                    }
                }, { upsert: true }, (err, res) => {
                    if (err) throw err;
                });
            });

            // Get the current documents from "guildservices" collection".
            const res = await dbo.collection("guildservices").find({}).toArray();

            // Iterate through res array and see if res element exists in the array that shows current active guilds.
            res.forEach(elem => {
                if (!activeGuilds.includes(elem.guildid) || (activeGuilds.length == 0 || activeGuilds === undefined)) {
                    toBeDeleted.push(elem);
                }
            });

            // Iterate through toBeDeleted and delete it from collection.
            toBeDeleted.forEach((elem) => {
                dbo.collection("guildservices").findOneAndDelete({ 'guildid': elem.guildid });
            });

            db.close();
        });
    }

           /**
    * Inserts all current players on the server into mongoDB database.
    * @method MongoDB#UploadJSON
    * @static
    * @async
    */
    static async UploadJSON() {      
        MongoClient.connect('mongodb://' + config.database.host + ':' + config.database.port, { useNewUrlParser: true }, async (err, db) => {
            if (err) throw err;

            // Database variable.
            const dbo = db.db(config.database.dbname);

            // Get the data to be entered into the database.
            const data = JSON.parse(fs.readFileSync('./data/pcs_pcequip.json'));

            // Sort all data and filter on serial.
            let activePlayers = data.map(elem => elem.serial);
            let toBeDeleted = [];

            // Step through all the data and insert it into the database
            data.forEach(async (elem) => {
                dbo.collection("characterservices").findOneAndUpdate({
                    'serial': elem.serial
                }, {
                    $set: {
                        'account': elem.account,
                        'name': elem.name,
                        'stats': elem.stats,
                        'skills': elem.skills,
                        'equipment': elem.equipment,
                        'gender': elem.gender,
                        'color': elem.color
                    }
                }, {
                    upsert: true
                }, (err, res) => {
                    if (err) throw err;
                });
            });

             // Get all documents from "characterservices" collection.
             const res = await dbo.collection("characterservices").find({}).toArray();

             // Iterate through res array and see if res element exists in deleteArray
             res.forEach((elem) => {
                 if (!activePlayers.includes(elem.serial) || (activePlayers.length == 0 || activePlayers === undefined)) {
                     toBeDeleted.push(elem);
                 }
             });

            // Iterate through toBeDeleted and delete it from collection.
            toBeDeleted.forEach((elem) => {
                dbo.collection("characterservices").findOneAndDelete({ 'serial': elem.serial });
            });

            db.close();
        });
    }
}

module.exports = MongoDB;