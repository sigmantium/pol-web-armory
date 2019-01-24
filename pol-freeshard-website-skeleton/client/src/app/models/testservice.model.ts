export class TestService {
    id: string;
    text: string;

    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.id = data.id || null;
        this.text = data.name || null;
    }
}
