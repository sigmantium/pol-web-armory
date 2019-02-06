export class Player {
    id: number;
    name: string;
    gender: string;
    race: string;
    title_guild: string;
    title_prefix: string;
    title_suffix: string;
    title_race: string;
    guild: string;
    murderer: string;

    constructor(data: any) {
        this.setData(data);
    }

    setData(data: any) {
        this.id = data._id || null;
        this.name = data.name || null;
        this.gender = this.getGender(data.gender) || 'Unknown';
        this.race = this.getRace(data.race) || null;
        this.title_guild = data.title_guild || 'None';
        this.title_prefix = data.title_prefix || 'None';
        this.title_suffix = data.title_suffix || 'None';
        this.title_race = data.title_race || 'None';
        this.guild = data.guild || null;
        this.murderer = this.isMurderer(data.murderer) || null;
    }

    isMurderer(state: boolean): string {
        return (state) ? 'Yes' : 'No';
    }

    getGender(gender: number): string {
        if (gender === 0) {
            return 'Male';
        } else if (gender === 1) {
            return 'Female';
        }

        return 'Unknown';
    }

    getRace(race: number): string {
        if (race === 0) {
            return 'Human';
        } else if (race === 1) {
            return 'Elf';
        } else if (race === 2) {
            return 'Gargoyle';
        }

        return 'Unknown';
    }
}
