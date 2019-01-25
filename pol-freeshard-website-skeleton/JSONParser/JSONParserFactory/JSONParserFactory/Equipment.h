#include <iostream>
#include <string>


class Equipment {

private:
	int layer;
	std::string container, objType, color;

public:
	Equipment(std::string objType, std::string color, int layer, std::string container) {
		this->objType = objType;
		this->color = color;
		this->layer = layer;
		this->container = container;
	}

	std::string getObjType() {return objType; }
	std::string getColor() {return color;}
	int getLayer() {return layer;}
	std::string getContainer() { return container; }





};
