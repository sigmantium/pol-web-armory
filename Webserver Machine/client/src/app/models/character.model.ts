// Models
import { Equipment } from './equipment.model';
import { Skill } from './skill.model';
import { Stat } from './stat.model';

export class Character {
    // Model variables
    id: number;
    account: string;
    serial: number;
    name: string;
    stats: Stat[];
    skills: Skill[];
    equipment: Equipment[];

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
        this.account = data.account || null;
        this.serial = data.serial || null;
        this.name = data.name || null;
        this.stats = data.stats || null;
        this.skills = data.skills || null;
        this.equipment = data.equipment || null;
    }

    /**
     * getSkills Description
     * @method Character#getSkills
     * @returns {Skill[]} An array including all skills
     */
    getSkills(): Skill[] {
        return this.skills;
    }
}
