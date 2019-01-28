#include <iostream>
#include <string>
#include <vector>
#define QUOTE "\""

#include "Equipment.h"
#include "Skills.h"
#include "Stats.h"


class Character {
private:
	int charIdx;
	std::string account,name, cmdLevel, objType, color;
	int serial;
	
	std::vector<Equipment> equipments;
	std::vector<Skills> skills;
	std::vector<Stats> stats;
	
public:

	Character(std::string account, int charIdx, std::string name , int serial, std::string objType, std::string color, std::string cmdLevel) {
		this->account = account;
		this->charIdx = charIdx;
		this->name = name;
		this->objType = objType;
		this->color = color;
		this->serial = serial;
		this->cmdLevel = cmdLevel;
	}

	int getSerial() {return serial;}

	void addEquipment(Equipment equipment) { this->equipments.push_back(equipment); }
	void addSkills(Skills skills) { this->skills.push_back(skills); }
	void addStats(Stats stats) { this->stats.push_back(stats); }

};
