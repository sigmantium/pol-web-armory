export class ServerStats {
    // Model variables
    id: number;
    accounts: number;
    guildcount: number;
    itemcount: number;
    mobilecount: number;
    onlinecount: number;
    polversion: number;
    serverload: number;
    uptime: string;
    date: Date;

    /**
     * Class Description Title
     * @class ServerStats
     * @classdesc ServerStats model class
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
        this.id = data._id || null;
        this.accounts = data.accounts || null;
        this.guildcount = data.guildcount || null;
        this.itemcount = data.itemcount || null;
        this.mobilecount = data.mobilecount || null;
        this.onlinecount = data.onlinecount || null;
        this.polversion = data.polversion || null;
        this.serverload = data.serverload || null;
        this.uptime = data.uptime || null;
        this.date = data.date || null;
    }
}
