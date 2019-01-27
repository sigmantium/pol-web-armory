export class Equipment {
    objtype: number;
    color: number;
    layer: number;

    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.objtype = data.objtype || null;
        this.color = data.color || null;
        this.layer = data.layer || null;
    }
}
