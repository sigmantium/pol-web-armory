#!/usr/bin/env node
const fs = require('fs');
const yargs = require('yargs').argv;
const _ = require('underscore');
const split = require('split');


let line0 = [], line1 = [];
let stats0 = [], stats1 = [];
let skills0 = [], skills1 = [];

let equipments = [];
let curlyBraces = 0;

let excludeWords = [ 'Character', 'Item', '{','}', '#', 'CProp'];

let equipmentsWords = [
  
]
let statsWords = [
  'Strength', 'Intelligence', 'Dexterity', 'Parry', 'Begging'
];

let skillsWords = [
  'Alchemy', 'Antatomy', 'AnimalLore','ItemIdentification',
  'ArmsLore', 'Blacksmithy', 'BowcraftFletching', 'Peacemaking',
  'Camping', 'Carpentry', 'Cartography', 'Cooking', 'DetectingHidden',
  'Discordance', 'EvaluatingIntelligence', 'Healing', 'Fishing',
  'ForensicEvaluation', 'Herding', 'Hiding', 'Provocation', 
  'Inscription', 'Lockpicking', 'Magery', 'ResistingSpells', 
  'Tactics', 'Snooping', 'Musicianship', 'Poisoning', 
  'Archery', 'SpiritSpeak', 'Stealing', 'Tailoring', 
  'AnimalTaming', 'TasteIdentification', 'Tinkering',
  'Tracking', 'Veterinary', 'Swordsmanship', 'MaceFighting', 
  'Fencing', 'Wrestling', 'Lumberjacking', 'Mining', 
  'Meditation', 'Stealth', 'RemoveTrap', 'Necromancy', 
  'BattleFocus', 'Chivalry'

];


if(yargs.i && yargs.o) {
	readFile(yargs.i, (yargs.h == true), yargs.p ? new RegExp(yargs.p, 'g') : new RegExp("[^\\n\\r\\t ]+",'g'));
}
else {
	console.log("Expected --i=\<inputFile.txt\> --o=\<inputFile.txt\> --h\<optional use header flag\> --p\<optional regex pattern to match field separator>");
}
// /[^\t]+/g
function readFile(inPath, useHeader, regex) {

  var outData = [];

	var readStream = fs.createReadStream(inPath)
		.pipe(split())
		.on('data', function (line) {
      

      line = line.toString().match(regex);
     

			if(line){
        
        // A counter to see if the line is within the Character or Item object. 
        if(foundCurlyBraces(line)){
          curlyBraces++;
        }

        // If its in the same object and it doesn't have any of the excluded words on the line.
        if(curlyBraces < 2 && excludeWords.indexOf(line[0]) == -1){        
          // If it has a skillword as first value. Insert it into skills array.
          if(skillsWords.indexOf(line[0]) > -1){
            skills0.push(line[0]);
            skills1.push(line[1]);
          }else if(statsWords.indexOf(line[0]) > -1){ // else if it has stats, insert it into stats array.
            stats0.push(line[0]);
            stats1.push(line[1]);       
          }else{ // or else to the main array.
            line0.push(line[0]);
            line1.push(line[1]);
          }     
        }


        // If it has two curly braces, it means that the object is closed. 
        if(curlyBraces == 2){

          // create objects of each array.
          var data = _.object(line0,line1);

           // push it to the outData.
          outData.push(data);
          
          resetValues();
        }
			}
		});

	readStream.on('end', function () {
    // TODO: Tänker att vi här inne samlar ihop alla objekt och använder oss av en array med objektet och stegar igenom varje item och söker i character objektens array för att leta efter "Serial" och därefter pushar in varje item i en array
    // i det character-objektet. 
		writeFile(outData, yargs.o);
	});
}

function foundCurlyBraces(line){
  return line == '{' || line == '}';
}

function resetValues(){
  data = [];
  line0 = [];
  line1 = [];
  stats0 = [];
  stats1 =[];
  skills0 = [];
  skills1 =[];
  curlyBraces = 0;
}

function writeFile(data, path){
	var jsonOut = fs.createWriteStream(path);
	jsonOut.write(JSON.stringify(data));
	jsonOut.on('error', function(err) { console.log(err); });
	jsonOut.end();
	console.log("done!");
}
