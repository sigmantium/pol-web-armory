export class Equipment {
    objtype: number;
    color: number;
    layer: number;

    constructor(data: any) {
        this.setData(data);
    }

    setData(data: any) {

        console.log('Equipment data: ' + JSON.stringify(data));

        this.objtype = Number(data.ObjType) || null;
        this.color = Number(data.Color) || null;
        this.layer = Number(data.Layer) || null;
    }
}
