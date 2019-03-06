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
 
         MongoClient.connect('mongodb://' + config.database.host + ':' + config.database.port, { useNewUrlParser: true }, async function(err,db){

            if (err) throw err;
        
            var dbo = db.db(config.database.dbname);

                //Det här går att lägga in elem.serial i en array

            var d = new Date();    
            dbo.collection('serverstatsservice').insertOne({ 
                'accounts': data.accounts,
                'guildcount': data.guildcount,
                'itemcount': data.itemcount,
                'mobilecount': data.mobilecount,
                'onlinecount': data.onlinecount,
                'polversion': data.polversion,
                'serverload': data.serverload,
                'uptime': data.uptime,
                'uploaded' : d
            }, { upsert: true }, (err, res) => {
        
            if (err) throw err;

            });
                
                // closing db-connection.
                db.close();
             
         });
    }

    // Update server statistics
    static async UpdateOnlinePlayers(data) {   
    
         // Insert all data into array.
        let onlinePlayers = data.map(function(elem) { return elem.serial; });
        let toBeDeleted = [];

        MongoClient.connect('mongodb://' + config.database.host + ':' + config.database.port, { useNewUrlParser: true }, async function(err,db){
                if (err) throw err;
            
                var dbo = db.db(config.database.dbname);

                data.forEach((elem) => {    
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
    
                    });
                });

  
                
                // Get the current documents from "inventory" collection".
                const res = await dbo.collection("onlineplayerservice").find({}).toArray();  
                // Iterate through res array and see if res element exists in deleteArray
                res.forEach((elem) =>{
                    if(!onlinePlayers.includes(elem.serial) || (onlinePlayers.length == 0 || onlinePlayers === undefined)){
                        toBeDeleted.push(elem);
                    }
                });

                // Iterate through toBeDeleted and delete it from collection.
                toBeDeleted.forEach((elem) =>{
                    dbo.collection("onlineplayerservice").findOneAndDelete({ 'serial': elem.serial});
                }); 

                // closing db-connection.
                db.close();
            
        });


    }

    static async UpdateGuilds(data) {   

        let activeGuilds = data.map(function(elem) { return elem.guildid; });
        let toBeDeleted = [];

        MongoClient.connect('mongodb://' + config.database.host + ':' + config.database.port, { useNewUrlParser: true }, async function(err,db){
                if (err) throw err;
            
                var dbo = db.db(config.database.dbname);

                data.forEach(async (elem) => {

                    dbo.collection('guildservice').findOneAndUpdate({ 'guildid': elem.guildid }, { $set: { 
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
        
    
                    });
     
                });

                // Get the current documents from "inventory" collection".
                const res = await dbo.collection("guildservice").find({}).toArray();  
                // Iterate through res array and see if res element exists in deleteArray
                res.forEach((elem) =>{
                    if(!activeGuilds.includes(elem.guildid) || (activeGuilds.length == 0 || activeGuilds === undefined)){
                        toBeDeleted.push(elem);
                    }
                });

                // Iterate through toBeDeleted and delete it from collection.
                toBeDeleted.forEach((elem) =>{
                    dbo.collection("guildservice").findOneAndDelete({ 'guildid': elem.guildid});
                }); 


                db.close();   
        });

    }  
    
    
    static async UploadJSON() { 
        MongoClient.connect('mongodb://' + config.database.host + ':' + config.database.port, { useNewUrlParser: true }, function(err,db){
            if (err) throw err;
            
            // Declaring the database with its name.
            var dbo = db.db(config.database.dbname);

            // get the data to put in to the DB.
            const data = JSON.parse(fs.readFileSync('./data/pcs_pcequip.json'));

           
            // Iterate through all the data and insert it into mongo
            data.forEach(async (elem) => {
                dbo.collection("characterservices").findOneAndUpdate({ 'serial': elem.serial }, { $set: { 
                        'account': elem.account,
                        'name': elem.name,
                        'stats': elem.stats,
                        'skills': elem.skills,
                        'equipment': elem.equipment
                    }}, { upsert: true }, (err, res) => {
                
                    if (err) throw err;
    
                });
            });
            db.close();
        });
    }  
}

module.exports = MongoDB;