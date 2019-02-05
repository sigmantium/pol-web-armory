export class Guild {
    guildid: number;
    abbr: string;
    charter: string;
    faction: string;
    master: string;
    name: string;
    stone: number;
    type: string;
    website: string;
    members: string;
    allies: string;
    enemies: string;

    constructor(data: any) {
        this.setData(data);
    }

    setData(data: any) {
        this.guildid = data.guildid || null;
        this.abbr = data.abbr || null;
        this.charter = data.charter || null;
        this.faction = data.faction || null;
        this.master = data.master || null;
        this.name = data.name || null;
        this.stone = data.stone || null;
        this.type = data.type || null;
        this.website = data.website || null;
        this.members = data.members || null;
        this.allies = data.allies || null;
        this.enemies = data.enemies || null;
    }
}
