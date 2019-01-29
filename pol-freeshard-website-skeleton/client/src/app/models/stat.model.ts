export class Stat {
    attributeName: string;
    attributeValue: number;

    constructor(data: any) {
        this.setData(data);
    }

    setData(data: any) {
        this.attributeName = data.attributeName || null;
        this.attributeValue = data.attributeValue || null;
    }
}
