import { Equipment } from './equipment.model';
import { Skill } from './skill.model';
import { Stat } from './stat.model';

export class Character {
    id: number;
    account: string;
    serial: number;
    name: string;
    stats: Stat[];
    skills: Skill[];
    equipment: Equipment[];

    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.id = data._id || null;
        this.account = data.account || null;
        this.serial = data.serial || null;
        this.name = data.name || null;
        this.stats = data.stats || null;
        this.skills = data.skills || null;
        this.equipment = data.equipment || null;
    }
}
