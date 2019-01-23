export class Armory {
    id: number;
    name: string;
    items: any;

    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.id = data.id || null;
        this.name = data.name || null;
        this.items = data.items || null;
    }
}
