export class Stat {
    // Model variables
    name: string;
    value: number;

    /**
     * Class Description Title
     * @class Stat
     * @classdesc Stat model class
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
        this.name = data.name || null;
        this.value = data.value || null;
    }
}
