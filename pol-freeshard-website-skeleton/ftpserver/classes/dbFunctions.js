const MongoClient = require('mongodb').MongoClient;

/** 
MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, async (err, client) => {
        
        if (err) throw err; 

        console.log('Connected!');

        const database = await client.db('armory_backend');

        // Check if collection exists
        const collection = await database.collection('characterservices', (err, res) => {   
            if (err) throw err; // Database does not exist
        });

        // Testdata
        const stats = [{"Strength":"6000"}, {"Intelligence":"6000"}, {"Dexterity":"6000"}];
        const equipment = [{"Serial": "0x4000b835", "ObjType":"0x2045", "Graphic":"0x2045", "Color":"0x799", "X":"71", "Y":"65", "Z":"0", "Facing":"11", "Revision":"1", "Realm":"britannia", "Layer":"11", "Container":"0x1563","DecayAt":"113568"},{"Serial":"0x4000b834","ObjType":"0x204d","Graphic":"0x204d","X":"96","Y":"129","Z":"0","Facing":"16","Revision":"1","Realm":"britannia","Layer":"16","Container":"0x1563","DecayAt":"113568"},{"Serial":"0x40006a03","ObjType":"0xe75","Graphic":"0xe75","X":"0","Y":"0","Z":"0","Facing":"21","Revision":"0","Realm":"britannia","Layer":"21","Container":"0x1563","DecayAt":"197593"},{"Serial":"0x400122dc","ObjType":"0x13fe","Graphic":"0x13fe","X":"0","Y":"0","Z":"0","Facing":"1","Revision":"1","Realm":"britannia","Layer":"1","Container":"0x1563","DecayAt":"195614"},{"Serial":"0x40012294","ObjType":"0x1f03","Graphic":"0x1f03","X":"0","Y":"0","Z":"0","Facing":"22","Revision":"0","Realm":"britannia","Layer":"22","Container":"0x1563","DecayAt":"195742"}];
        const serials = [{'serial': "0x955", 'account': 'testaccount'}, {'serial': "0x955", 'account': 'testaccount'}, {'serial': "0x955", 'account': 'testaccount'}];

        serials.forEach(async (e)  => {
            
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
    });
*/