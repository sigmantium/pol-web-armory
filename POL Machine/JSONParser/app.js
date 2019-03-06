// Native libraries
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Classes
const JSONParser = require('./jsonparser');
const MongoDB = require('./dbfunctions');

const app = express();

app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const incomingData = req.body;

    const testData = JSON.parse(fs.readFileSync('./data/server.json'));

    // Update server statistics
    await MongoDB.UpdateServerStats(testData[0]);

    // Update online players data
    await MongoDB.UpdateOnlinePlayers(testData[1].onlineplayers);

    // Update guilds data
    await MongoDB.UpdateGuilds(testData[2].guilds);

    // Parse the data files into JSON
    await JSONParser.StartJSONParser();

    // Upload changes to MongoDB
    await MongoDB.UploadJSON(); 

    // Send pack response
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Done');
});

app.listen(8888);
console.log('Listening at http://localhost:8888');
