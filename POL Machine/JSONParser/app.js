// Native libraries
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const filefunction = require('./filefunctions');

// Classes
const JSONParser = require('./jsonparser');
const MongoDB = require('./dbfunctions');

const app = express();

app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const incomingData = req.body;

    // This function will take pcs.txt and pcequp.txt and make pcs_pcequip.txt
    await filefunction.mergeFiles('./../POL/data/pcs.txt','./../POL/data/pcequip.txt',"./data/pcs_pcequip.txt"); 

    const testData = JSON.parse(fs.readFileSync('./data/server.json'));

    // Update server statistics
    await MongoDB.UpdateServerStats(testData[0]);

    // Update online players data
    await MongoDB.UpdateOnlinePlayers(testData[1].onlineplayers);

    // Update guilds data
    await MongoDB.UpdateGuilds(testData[2].guilds);

    // Parse the data file pcs_pcequip.txt into JSON.
    await JSONParser.StartJSONParser();

    // Upload changes to MongoDB
    await MongoDB.UploadJSON(); 

    // Send pack response
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Done');
});

app.listen(8888);
console.log('Listening at http://localhost:8888');
