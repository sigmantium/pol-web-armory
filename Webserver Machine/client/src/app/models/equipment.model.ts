export class Equipment {
    // Model variables
    objtype: number;
    color: number;
    layer: number;

    /**
     * Class Description Title
     * @class Equipment
     * @classdesc Equipment model class
     * @param {any} data Data to be assigned to model variables
     */
    constructor(data: any) {
        this.setData(data);
    }

    /**
     * setData Description
     * @param {any} data Data to be assigned to model variables
     */
    setData(data: any): void {
        this.objtype = Number(data.ObjType) || null;
        this.color = Number(data.Color) || null;
        this.layer = Number(data.Layer) || null;
    }
}
