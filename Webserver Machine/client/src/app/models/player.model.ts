export class Player {
    serial: number;
    name: string;
    gender: number;
    race: string;
    title_guild: string;
    title_prefix: string;
    title_suffix: string;
    title_race: string;
    guild: string;
    murderer: number;

    constructor(data: any) {
        this.setData(data);
    }

    setData(data: any) {
        this.serial = data.serial || null;
        this.name = data.name || null;
        this.gender = data.gender || null;
        this.race = data.race || null;
        this.title_guild = data.title_guild || null;
        this.title_prefix = data.title_prefix || null;
        this.title_suffix = data.title_suffix || null;
        this.title_race = data.title_race || null;
        this.guild = data.guild || null;
        this.murderer = data.murderer || null;
    }
}
