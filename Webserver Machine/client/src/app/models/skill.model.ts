export class Skill {
    name: string;
    value: number;

    constructor(data: any) {
        this.setData(data);
    }

    setData(data: any) {
        this.name = data.name || null;
        this.value = data.value || null;
    }
}
