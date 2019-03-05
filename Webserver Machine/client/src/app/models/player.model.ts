export class Player {
    // Model variables
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

    /**
     * Class Description Title
     * @class Character
     * @classdesc Character model class
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

    /**
     * isMurderer Description
     * @method Player#isMurderer
     * @param {boolean} state The murderer state of the player
     * @returns {string} Indiciation if the player is a murderer (pk) or not as a string
     */
    isMurderer(state: boolean): string {
        return (state) ? 'Yes' : 'No';
    }

    /**
     * getGender Description
     * @method Player#getGender
     * @param {number} gender Gender of player (0 = male, 1 = female)
     * @returns {string} Indiciation of the gender of the player as a string
     */
    getGender(gender: number): string {
        if (gender === 0) {
            return 'Male';
        } else if (gender === 1) {
            return 'Female';
        }

        return 'Unknown';
    }

    /**
     * getRace Description
     * @method Player#getRace
     * @param {number} race Race of player (0 = human, 1 = elf, 2 = gargoyle, else = unknown)
     * @returns {string} Indiciation of the players race as a string
     */
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
