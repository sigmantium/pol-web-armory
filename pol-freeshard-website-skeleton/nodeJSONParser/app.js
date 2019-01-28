#!/usr/bin/env node
const fs = require('fs');
const yargs = require('yargs').argv;
const _ = require('underscore');
const split = require('split');
let keys;


if(yargs.i && yargs.o) {
	readFile(yargs.i, (yargs.h == true), yargs.p ? new RegExp(yargs.p, 'g') : new RegExp("[^\\n\\r\\t ]+",'g'));
}
else {
	console.log("Expected --i=\<inputFile.txt\> --o=\<inputFile.txt\> --h\<optional use header flag\> --p\<optional regex pattern to match field separator>");
}
// /[^\t]+/g
function readFile(inPath, useHeader, regex) {

  var outData = [];
  var curlyBraces = 0;

  var line0 = [];
  var line1 = [];

  var stats0 = [];
  var stats1 = [];

  var equipments = [];

  var skills0 = [];
  var skills1 = [];
  
  var excludeWords = [ 'Character', 'Item', '{','}', '#', 'CProp'];
  var equipmentsWords = [
    
  ]
  var statsWords = [
    'Strength', 'Intelligence', 'Dexterity', 'Parry', 'Begging'
  ];

  var skillsWords = [
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

	var readStream = fs.createReadStream(inPath)
		.pipe(split())
		.on('data', function (line) {
      

      line = line.toString().match(regex);
     

			if(line){

        // If a object is already inserted into the file. Reset values.
        if(curlyBraces == 2){
          curlyBraces = 0;
          JSONObject = [];
        }
        
        // A counter to see if the line is within the Character or Item object. 
        if(line == '{' || line == '}'){
          curlyBraces++;
        }

        // If its in the same object and it doesn't have  
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
          var skills = _.object(skills0, skills1);
          var stats = _.object(stats0, stats1);
          var data = _.object(line0,line1);
          //data.push(skills);
          //data.push(stats);
          outData.push(data); // push it to the outData.
          data = []; // clear the data array.
          line0 = [];
          line1 = [];
        }
			}
		});

	readStream.on('end', function () {
		writeFile(outData, yargs.o);
	});
}

function writeFile(data, path){
	var jsonOut = fs.createWriteStream(path);
	jsonOut.write(JSON.stringify(data));
	jsonOut.on('error', function(err) { console.log(err); });
	jsonOut.end();
	console.log("done!");
}

function setHeaderRowAsKeys(line){
	keys = line;
}

function addKeys(line){
	return _.object(keys, line);
}