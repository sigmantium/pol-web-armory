// Native libraries
const express = require('express');
const bodyParser = require('body-parser');

// Classes
const JSONParser = require('./jsonparser');
const MongoDB = require('./dbfunctions');

const app = express();

app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const incomingData = req.body;
    
    console.log('Data: ' + JSON.stringify(incomingData));
    
    // Update server statistics
    // await MongoDB.UpdateServerStats(incomingData[0]);

    // Update online players data
    // await MongoDB.UpdateOnlinePlayers(incomingData[1]);

    // Update guilds data
    // await MongoDB.UpdateGuilds(incomingData[2]);

    // Parse the data files into JSON
    // await JSONParser.StartJSONParser();

    // Upload changes to MongoDB
    // await MongoDB.UploadJSON(); 

    // Send pack response
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Done');
});

app.listen(8888);
console.log('Listening at http://localhost:8888');
