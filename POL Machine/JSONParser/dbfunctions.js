const config = require('./config.json');
const fs = require('fs');
const FileFunctions = require('./filefunctions');
const MongoClient = require('mongodb').MongoClient;

class MongoDB {
    

    // Constructor
    constructor() {
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
    static async getInstance() {
        try {
            return (this.db != null) ? this.db : await this.connect();
        } catch (e) {
            return e;
        }
    }

    // Update server statistics
    static async UpdateServerStats(data) {
        MongoClient.connect('mongodb://' + config.database.host + ':' + config.database.port, { useNewUrlParser: true }, function(err,db){
            if (err) throw err;
            
            var dbo = db.db("armory_backend");
            const data = JSON.parse(fs.readFileSync('./data/server.json'));
    
            data.forEach(async (elem) => {
                /*dbo.collection('serverstatsservice').insertOne({ $set: { 
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
    
                    console.log('Updated record: ' + elem.serial);
                });*/
                console.log("Data:" +data);
    
    //            console.log('Done updating all records!');
            });
            db.close();
        });
    }

    // Update server statistics
    static async UpdateOnlinePlayers(data) {
        MongoClient.connect('mongodb://' + config.database.host + ':' + config.database.port, { useNewUrlParser: true }, function(err,db){
            if (err) throw err;
            
            var dbo = db.db("armory_backend");
            const data = JSON.parse(fs.readFileSync('./data/pcs_pcequip.json'));
    
            data.forEach(async (elem) => {
                dbo.collection('onlineplayerservice').findOneAndUpdate({ 'serial': elem.serial }, { $set: { 
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
    
                    console.log('Update Online Players: updated record: ' + elem.serial);
                });
    
                console.log('Done updating all records!');
            });
            db.close();
        });
    }

    static async UpdateGuilds(data) {
        MongoClient.connect('mongodb://' + config.database.host + ':' + config.database.port, { useNewUrlParser: true }, function(err,db){
            if (err) throw err;
            
            var dbo = db.db("armory_backend");
            const data = JSON.parse(fs.readFileSync('./data/pcs_pcequip.json'));
    
            data.forEach(async (elem) => {
                dbo.collection('guildservices').findOneAndUpdate({ 'guildid': elem.guildid }, { $set: { 
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
    
                    console.log('Updated record: ' + elem.serial);
                });
    
                console.log('Done updating all records!');
            });
            db.close();
        });
    }    

    static async UploadJSON() { 
        MongoClient.connect('mongodb://' + config.database.host + ':' + config.database.port, { useNewUrlParser: true }, function(err,db){
            if (err) throw err;
            
            // Declaring the database with its name.
            var dbo = db.db("armory_backend");

            // get the data to put in to the DB.
            const data = JSON.parse(fs.readFileSync('./data/pcs_pcequip.json'));

            // The current data.
            const dbData = dbo.collection("characterservices").find({});
            console.log(data);
            console.log("dbData: "+dbData);

           
            // Iterate through all the data and insert it into mongo
            data.forEach(async (elem) => {
            /*    dbo.collection("characterservices").findOneAndUpdate({ 'serial': elem.serial }, { $set: { 
                        'account': elem.account,
                        'name': elem.name,
                        'stats': elem.stats,
                        'skills': elem.skills,
                        'equipment': elem.equipment
                    }}, { upsert: true }, (err, res) => {
                
                    if (err) throw err;
    
                    console.log('UpdateJSON: updated record: ' + elem.serial);
                });*/
    
               // console.log("Data: "+elem.serial);
             
            });
            console.log('Done updating all records!');
            db.close();
        });
    }    
}

module.exports = MongoDB;