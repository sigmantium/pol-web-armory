
#include <string>

class Stats {

	Stats(std::string name, int value) {
		this->name = name;
		this->value = value;
	}

	std::string getName() {
		return name;
	}

	int getValue() {
		return value;
	}



private:
	std::string name;
	int value;
};
