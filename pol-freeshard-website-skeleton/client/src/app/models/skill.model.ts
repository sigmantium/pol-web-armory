export class Skill {
    skillName: string;
    skillValue: number;

    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.skillName = data.skillName || null;
        this.skillValue = data.skillValue || null;
    }
}
