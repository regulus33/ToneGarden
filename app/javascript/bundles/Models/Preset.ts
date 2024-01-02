import Gradient from "./Gradient";
// TODO: merge with BinauralBeat
const symbolMap = {
    'alpha': 'α',
    'beta':  'β',
    'delta': 'δ',
    'theta': 'ϴ',
    'gamma': 'γ'
}

const rangeMap = {
    'alpha': [8,13],
    'beta': [14,29],
    'delta': [0.1, 3],
    'theta': [4, 7],
    'gamma': [30, 39]
}

export default class Preset {
    id: string;
    left: number;
    right: number;
    name: string;

    constructor(json: object) {
        this.fromJson(json);
    }

    rangeString() :string {
        console.log(`left: ${this.left} right: ${this.right}`)
        const difference = Math.abs(this.left - this.right);
        console.log(`difference: ${difference}`)
        if(difference <= 0 || difference > 40 )
            return 'NA';
        if(this.isInRange(difference, rangeMap['alpha'])){
            return 'alpha';
        }
        if(this.isInRange(difference, rangeMap['beta'])){
            return 'beta';
        }
        if(this.isInRange(difference, rangeMap['gamma'])){
            return 'gamma';
        }
        if(this.isInRange(difference, rangeMap['theta'])){
            return 'theta';
        }
        if(this.isInRange(difference, rangeMap['delta'])){
            return 'delta';
        }
        // alert('No conditions matched');
        return 'NA';
    }

    rangeSymbol(): string {
       return symbolMap[this.rangeString()]
    }

    // 4 for 4 to 7 is true
    // 7 for 4 to 7 is true
    private isInRange(num: number, range: number[]): boolean {
        if(num >= range[0] && num <= range[1]) {
            return true
        }
        return false
    }

    fromJson(json) {
        console.log('Preset:fromJson', `json: ${json}`)
        const { left, right, name, id } = json;
        this.id = id;
        this.left = left;
        this.right = right;
        this.name = name;
    }

    gradient(){
        return new Gradient(this.rangeString());
    }

    toJson(): object {
        const { left, right, name } = this
        return {
            left,
            right,
            name,
        }
    }
}


