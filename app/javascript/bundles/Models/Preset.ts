export default class Preset {
    left: number;
    right: number;
    range: string;
    name: string;
    color: string;

    constructor(json: Object) {
        this.fromJson(json);
    }

    fromJson(json) {
        console.log('Preset:fromJson', `json: ${json}`)
        const { left, right, range, name, color } = json;
        this.left = left;
        this.right = right;
        this.range = range;
        this.name = name;
        this.color = color;
    }

    toJson() {
        const {left, right, range, name, color} = this
        return {
            left,
            right,
            range,
            name,
            color,
        }
    }
}


