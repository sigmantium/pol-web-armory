export class ServerStats {
    id: number;
    accounts: number;
    guildcount: number;
    itemcount: number;
    mobilecount: number;
    onlinecount: number;
    polversion: number;
    serverload: number;
    uptime: string;

    constructor(data: any) {
        this.setData(data);
    }

    setData(data: any) {
        this.id = data.id || null;
        this.accounts = data.accounts || null;
        this.guildcount = data.guildcount || null;
        this.itemcount = data.itemcount || null;
        this.mobilecount = data.mobilecount || null;
        this.onlinecount = data.onlinecount || null;
        this.polversion = data.polversion || null;
        this.serverload = data.serverload || null;
        this.uptime = data.uptime || null;
    }
}
