export class Stat {
    attributeName: string;
    attributeValue: number;

    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.attributeName = data.attributeName || null;
        this.attributeValue = data.attributeValue || null;
    }
}
