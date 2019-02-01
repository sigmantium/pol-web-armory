const _ = require('underscore');
const split = require('split');
const fs = require('fs');
const config = require('./config.json');

let lineNameArray = [], lineValueArray = [];
let statsNameArray = [], statsValueArray = [];
let skillsNameArray = [], skillsValueArray = [];
let data;

let curlyBrackets = 0;
let character = 0;
let item = 0;

class JSONParser {

    constructor() {}

    static StartJSONParser() {
        console.log('Starting JSON parser...');
        this.readFile("./data/pcs_pcequip.txt", "./data/pcs_pcequip.json", new RegExp("[^\\n\\r\\t ]+", 'g'));
    }

    static readFile(inPath, outPath, regex) {
      let outData = [];
     

      const readStream = fs.createReadStream(inPath)
        .pipe(split())
        .on('data', line => {
          line = line.toString().match(regex);

          if (line) {

            this.setObjectName(line);

            // A counter to see if the line is within the Character or Item object.
            if (this.foundCurlyBrackets(line)) {
              curlyBrackets++;
            }


            // If its in the same object and it doesn't have any of the excluded words on the line.
            if (curlyBrackets < 2 && config.parserwords.excludewords.indexOf(line[0]) == -1) {
              var word = line[0];
              var value = line[1];
              // If it has a skillword as first value. Insert it into skills array.
              if (config.parserwords.skillswords.indexOf(word) > -1) {
                skillsNameArray.push(word);
                skillsValueArray.push(Number(parseFloat(value)));
              } else if (config.parserwords.statswords.indexOf(word) > -1) { // else if it has stats, insert it into stats array.
                statsNameArray.push(word);
                statsValueArray.push(Number(parseFloat(value)));
              } else { // or else to the main array.
                if(!(item && config.parserwords.excludeequipmentsword.indexOf(word) > -1)){
                  lineNameArray.push(word);
                  lineValueArray.push(value);
                }  
              }
            }

            // If it has two curly braces, it means that the object is closed.
            if (curlyBrackets == 2) {
              data = _.object(lineNameArray, lineValueArray);

              if (character) {
                data.equipment = [];
                data.skills = [];
                data.stats = [];

                this.fillStats();
                this.fillSkills();

                outData.push(data);
              } else if (item) {
                // Iterate through all characters object.
                for (var j in outData) {
                  // ..To see if the container value is the same as the Serial.
                  if (data.Container == outData[j].Serial) {
                    //add it to the equipment array
                    outData[j].equipment.push(data);
                  }
                }
              }

              this.resetValues();
            }
          }
    });

    readStream.on('end', () => {
      this.writeFile(outData, outPath);
    });
  }

  static foundCurlyBrackets(line) {
    return line == '{' || line == '}';
  }

  static fillSkills(){

    for(var i in skillsNameArray){
      data.skills.push( {"name" : skillsNameArray[i], "value": skillsValueArray[i]});
    }
  }

  static fillStats(){
    for(var i in statsNameArray){
      data.stats.push( {"name" : statsNameArray[i], "value": statsValueArray[i]});
    }
  }

  static resetValues() {
    data = [];
    lineNameArray = [];
    lineValueArray = [];
    statsNameArray = [];
    statsValueArray = [];
    skillsNameArray = [];
    skillsValueArray = [];
    curlyBrackets = 0;
  }

  static writeFile(data, path) {
    let jsonOut = fs.createWriteStream(path);
    jsonOut.write(JSON.stringify(data));
    jsonOut.on('error', err => console.log(err));
    jsonOut.end();
  }

  static setObjectName(name){
    if (name == 'Character') {
      character = 1;
      item = 0;
    } else if (name == 'Item') {
      character = 0;
      item = 1;
    }
  }
}

module.exports = JSONParser;
