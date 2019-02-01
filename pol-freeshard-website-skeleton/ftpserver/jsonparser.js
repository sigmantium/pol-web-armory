const _ = require('underscore');
const split = require('split');
const fs = require('fs');
const config = require('./config.json');

let lineNameArray = [], lineValueArray = [];
let statsNameArray = [], statsValueArray = [];
let skillsNameArray = [], skillsValueArray = [];
let data;

let skillsName =[];
let skillsValue = [];
let skillsObject = [];

let statsName = [];
let statsValue = [];
let statsObject = [];

let curlyBrackets = 0;

class JSONParser {

    constructor() {}

    static StartJSONParser() {
        console.log('Starting JSON parser...');
        // HÄR FELAR koden. "msg":"readFile is not defined", är felmeddelandet.
       // readFile("./data/pcs_pcequip.txt", "./data/pcs_pcequip.json", new RegExp("[^\\n\\r\\t ]+", 'g'));
    }

    readFile(inPath, outPath, regex) {
      let outData = [];
      let character = 0;
      let item = 0;

      const readStream = fs.createReadStream(inPath)
        .pipe(split())
        .on('data', line => {
          line = line.toString().match(regex);

          if (line) {
            if (line == 'Character') {
              character = 1;
              item = 0;
            } else if (line == 'Item') {
              character = 0;
              item = 1;
            }

            // A counter to see if the line is within the Character or Item object.
            if (foundCurlyBrackets(line)) {
              curlyBrackets++;
            }

            // If its in the same object and it doesn't have any of the excluded words on the line.
            if (curlyBrackets < 2 && config.parserwords.excludewords.word.indexOf(line[0]) == -1) {
              var word = line[0];
              var value = line[1];
              // If it has a skillword as first value. Insert it into skills array.
              if (config.parserwords.skillswords.word.indexOf(line[0]) > -1) {
                skillsNameArray.push(word);
                skillsValueArray.push(Number(parseFloat(value)));
              } else if (config.parserwords.statswords.word.indexOf(line[0]) > -1) { // else if it has stats, insert it into stats array.
                statsNameArray.push(word);
                statsValueArray.push(Number(parseFloat(value)));
              } else { // or else to the main array.
                lineNameArray.push(word);
                lineValueArray.push(value);
              }
            }

            // If it has two curly braces, it means that the object is closed.
            if (curlyBrackets == 2) {
              data = _.object(lineName, lineValue);

              if (character) {
                data.equipment = [];
                data.skills = [];
                data.stats = [];

                fillStats();
                fillSkills();

                outData.push(data);
              } else if (item) {
                // Iterate through all characters object.
                for (j in outData) {
                  // ..To see if the container value is the same as the Serial.
                  if (data.Container == outData[j].Serial) {
                    //add it to the equipment array
                    outData[j].equipment.push(data);
                  }
                }
              }

              resetValues();
            }
          }
    });

    readStream.on('end', () => {
      // TODO: Tänker att vi här inne samlar ihop alla objekt och använder oss av en array med objektet och stegar igenom varje item och söker i character objektens array för att leta efter "Serial" och därefter pushar in varje item i en array
      // i det character-objektet.
      writeFile(outData, outPath);
    });
  }

  foundCurlyBrackets(line) {
    return line == '{' || line == '}';
  }

  fillSkills(){

    for(var i in skillsName){
      skillsName.push(skillsName[i]);
      skillsValue.push(skillsValue[i]);

      skillsObject.push(_.object(skillsN,skillsV));
      data.skills.push(skillsObject);

      // Clearing the arrays for the next loop.
      skillsName = [];
      skillsValue = [];
      skillsObject = [];
    }
  }

  fillStats(){
    for(var i in statsName){
      statsName.push(statsName[i]);
      statsValue.push(statsValue[i]);

      statsObject.push(_.object(statsN,statsV));
      data.stats.push(statsObject);

      // Clearing the arrays for the next loop.
      statsName = [];
      statsValue = [];
      statsObject = [];
    }
  }

  resetValues() {
    data = [];
    lineNameArray = [];
    lineValueArray = [];
    statsNameArray = [];
    statsValueArray = [];
    skillsNameArray = [];
    skillsValueArray = [];
    curlyBrackets = 0;
  }

  writeFile(data, path) {
    let jsonOut = fs.createWriteStream(path);
    jsonOut.write(JSON.stringify(data));
    jsonOut.on('error', err => console.log(err));
    jsonOut.end();
  }
}

module.exports = JSONParser;
