export class Guild {
    // Model variables
    guildid: number;
    abbr: string;
    charter: string;
    faction: string;
    master: string;
    name: string;
    type: string;
    website: string;
    members: number;
    allies: number;
    enemies: number;

    /**
     * Class Description Title
     * @class Guild
     * @classdesc Guild model class
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
        this.guildid = data.guildid || null;
        this.abbr = data.abbr || null;
        this.charter = data.charter || null;
        this.faction = data.faction || null;
        this.master = data.master || null;
        this.name = data.name || null;
        this.type = data.type || null;
        this.website = data.website || null;
        this.members = data.members.length || 1;
        this.allies = data.allies.length || 0;
        this.enemies = data.enemies.length || 0;
    }
}
