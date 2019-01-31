#!/usr/bin/env node

const fs = require('fs');
const yargs = require('yargs').argv;
const _ = require('underscore');
const split = require('split');

let lineName = [], lineValue = [];
let statsName = [], statsValue = [];
let skillsName = [], skillsValue = [];
let data;

let skillsN =[];
let skillsV = [];
let skillsObject = [];

let statsN = [];
let statsV = [];
let statsObject = [];

let curlyBrackets = 0;

const excludeWords = [
  'Character',
  'Item',
  '{',
  '}',
  '#',
  'CProp'
];

const statsWords = [
  'Strength',
  'Intelligence',
  'Dexterity'
];

const skillsWords = [
  'Alchemy',
  'Anatomy',
  'AnimalLore',
  'ItemIdentification',
  'ArmsLore',
  'Begging',
  'Blacksmithy',
  'BowcraftFletching',
  'Peacemaking',
  'Camping',
  'Carpentry',
  'Cartography',
  'Cooking',
  'DetectingHidden',
  'Discordance',
  'EvaluatingIntelligence',
  'Healing',
  'Fishing',
  'ForensicEvaluation',
  'Herding',
  'Hiding',
  'Provocation',
  'Inscription',
  'Lockpicking',
  'Magery',
  'ResistingSpells',
  'Tactics',
  'Snooping',
  'Musicianship',
  'Poisoning',
  'Archery',
  'SpiritSpeak',
  'Stealing',
  'Tailoring',
  'AnimalTaming',
  'TasteIdentification',
  'Tinkering',
  'Tracking',
  'Veterinary',
  'Swordsmanship',
  'MaceFighting',
  'Fencing',
  'Wrestling',
  'Lumberjacking',
  'Mining',
  'Meditation',
  'Stealth',
  'RemoveTrap',
  'Parry',
  'Necromancy',
  'BattleFocus',
  'Chivalry'
];

// Read file
if (yargs.i && yargs.o) {
  readFile(yargs.i, yargs.p ? new RegExp(yargs.p, 'g') : new RegExp("[^\\n\\r\\t ]+", 'g'));
} else {
  console.log("Expected --i=\<inputFile.txt\> --o=\<inputFile.txt\> --p\<optional regex pattern to match field separator>");
}

// /[^\t]+/g
function readFile(inPath, regex) {
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
        if (curlyBrackets < 2 && excludeWords.indexOf(line[0]) == -1) {
          // If it has a skillword as first value. Insert it into skills array.
          if (skillsWords.indexOf(line[0]) > -1) {
            var num = parseFloat(line[1]);
            var skillsV = Number(num);
            skillsName.push(line[0]);
            skillsValue.push(Number(parseFloat(line[1])));
          } else if (statsWords.indexOf(line[0]) > -1) { // else if it has stats, insert it into stats array.
            var number = parseFloat(line[1]);
            var statsV = Number(number);            
            statsName.push(line[0]);
            statsValue.push(statsV);
          } else { // or else to the main array.
            lineName.push(line[0]);
            lineValue.push(line[1]);
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
    writeFile(outData, yargs.o);
  });
}

function foundCurlyBrackets(line) {
  return line == '{' || line == '}';
}

function fillSkills(){
  
  for(var i in skillsName){
    skillsN.push(skillsName[i]);
    skillsV.push(skillsValue[i]);
    
    skillsObject.push(_.object(skillsN,skillsV));
    data.skills.push(skillsObject);

    // Clearing the arrays for the next loop.
    skillsN = [];
    skillsV = [];
    skillsObject = [];
  }
}

function fillStats(){
  for(var i in statsName){
    statsN.push(statsName[i]);
    statsV.push(statsValue[i]);
    
    statsObject.push(_.object(statsN,statsV));
    data.stats.push(statsObject);

    statsN = [];
    statsV = [];
    statsObject = [];
  }  
}

function resetValues() {
  data = [];
  lineName = [];
  lineValue = [];
  statsName = [];
  statsValue = [];
  skillsName = [];
  skillsValue = [];
  curlyBraces = 0;
}

function writeFile(data, path) {
  let jsonOut = fs.createWriteStream(path);
  jsonOut.write(JSON.stringify(data));
  jsonOut.on('error', err => console.log(err));
  jsonOut.end();
  console.log("done!");
}