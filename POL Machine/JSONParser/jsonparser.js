const _ = require('underscore');
const split = require('split');
const fs = require('fs');
const config = require('./config.json');

let lineNameArray = [], lineValueArray = [];
let statsNameArray = [], statsValueArray = [];
let skillsNameArray = [], skillsValueArray = [];
let data;

let curlyBrackets = 0;

/**
* Class Description Title
* @class JSONParser
* @classdesc Class that parse .txt file into json.
*/
class JSONParser {

  
    /**
    * Function that starts the parser
    * @method JSONParser#StartJSONParser
    * @static
    */
    static StartJSONParser() {
        console.log('Starting JSON parser...');
        this.readFile(config.files.filename, config.files.parsedFilename, new RegExp("[^\\n\\r\\t ]+", 'g'));
    }

    /**
    * Function that starts the parser
    * @method JSONParser#StartJSONParser
    * @static
    * @param {any} inPath Parameter showing which txt file should be parsed
    * @param {any} outPath Parameter showing where to put the JSON-file.
    * @param {any} regex Sequence of characters that defines the pattern.
    */
    static readFile(inPath, outPath, regex) {
      
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
            if (this.foundCurlyBrackets(line)) {
              curlyBrackets++;
            }


            // If its in the same object and it doesn't have any of the excluded words on the line.
            if (curlyBrackets < 2 && config.parserwords.excludewords.indexOf(line[0]) == -1) {
              var word = line[0];
              var value = line[1];
              // If it has a skillword as first value. Insert it into skills array.
              if (config.parserwords.skillswords.indexOf(word) > -1) {
                if(word)
                  skillsNameArray.push(word.toLowerCase());
                if(value)  
                  skillsValueArray.push(Number(parseFloat(value)));
              } else if (config.parserwords.statswords.indexOf(word) > -1) { // else if it has stats, insert it into stats array.
                if(word)
                  statsNameArray.push(word);
                if(value)
                  statsValueArray.push(Number(parseFloat(value)));
              } else { // or else to the main array.
                if(!(item && config.parserwords.excludeequipmentsword.indexOf(word) > -1)){
                  if(word)
                    lineNameArray.push(word.toLowerCase());
                  if(value && !(word == 'Name')){
                    lineValueArray.push(value.toLowerCase());
                  }else{
                    lineValueArray.push(value);
                  }
                    

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
                  if (data.container == outData[j].serial) {
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
   
      this.changeGumpid(outData);
      this.writeFile(outData, outPath);
    });
  }

  /**
  * This function has the task of replacing objType in each object to a gumpid. 
  * Gumpid is the value that images have, so it will be used in the visualization of characters.
  * @method JSONParser#changeGumpid
  * @static
  * @param {any} outData Data that stores all characters. 
  */
  static changeGumpid(outData){
    var gumpid = fs.readFileSync("objtype_to_gumpid.json");
    var data = JSON.parse(gumpid);

    for (var i in outData){
      var gender = outData[i]['gender'];
      
      for (var y in outData[i]['equipment']){      
        for (var j in data){
          
          if (outData[i]['equipment'][y]['objtype'].toLowerCase() === data[j]['objtype'].toLowerCase()){
            if (gender == '0'){ // If it's a male.
              outData[i]['equipment'][y]['objtype'] = data[j]['gumpid'];
            } else if (gender == '1'){ // If it's a female.
              if (data[j]['gumpid2']){ // If gumpid2 exists..
                outData[i]['equipment'][y]['objtype'] = data[j]['gumpid2'];
              }
              else{ // Else..
                outData[i]['equipment'][y]['objtype'] = data[j]['gumpid'];
              }  
            }
        }
      }
      
    }
  }
  }

  /**
   * Function that check the braces.
  *  @method JSONParser#foundCurlyBrackets
  *  @static
  *  @param {any} line Each line in txt file.
  *  @return {any} if brackets is found. return 1, else 0.
  */
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
}

module.exports = JSONParser;