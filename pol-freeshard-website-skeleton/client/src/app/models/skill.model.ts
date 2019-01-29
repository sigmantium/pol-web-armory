export class Skill {
    skillName: string;
    skillValue: number;

    constructor(data: any) {
        this.setData(data);
    }

    setData(data: any) {
        this.skillName = data.skillName || null;
        this.skillValue = data.skillValue || null;
    }
}
