export class Equipment {
    objtype: number;
    color: number;
    layer: number;

    constructor(data: any) {
        this.setData(data);
    }

    setData(data: any) {
        this.objtype = data.objtype || null;
        this.color = data.color || null;
        this.layer = data.layer || null;
    }
}
