// Native libraries
const express = require('express');
const bodyParser = require('body-parser');
const filefunction = require('./filefunctions');

// Classes
const JSONParser = require('./jsonparser');
const MongoDB = require('./mongodbadapter');

const app = express();

app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const incomingData = req.body;

    // This function will take pcs.txt and pcequp.txt as argumentsand make pcs_pcequip.txt of it.
    await filefunction.mergeFiles('./../POL/data/pcs.txt','./../POL/data/pcequip.txt',"./data/pcs_pcequip.txt"); 

    // Update server statistics
    await MongoDB.UpdateServerStats(incomingData[0]);

    // Update online players data
    await MongoDB.UpdateOnlinePlayers(incomingData[1].onlineplayers);

    // Update guilds data
    await MongoDB.UpdateGuilds(incomingData[2].guilds);

    // Parse the data file pcs_pcequip.txt into JSON.
    await JSONParser.StartJSONParser();

    // Upload changes to MongoDB
    await MongoDB.UploadJSON(); 

    // Send pack response
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Done');
});

// The app listens to port 8888.
app.listen(8888);
console.log('Listening at http://localhost:8888');
