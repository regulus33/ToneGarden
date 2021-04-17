import Preset from "./Preset";

const rangeToColorsMap = {
    'alpha': ['#0558ff', '#05ffe2'],
    'beta': ['#5005ff', '#ffb805'],
    'theta': ['#2605ff', '#a600ff'],
    'gamma': ['#3b66bd', '#00ccff'],
    'delta': ['#8800ff', '#0593ff'],
}

export default class Gradient {

    private readonly rangeString: string;

    constructor(rangeString: string) {
        this.rangeString = rangeString;
    }

    gradientPair() {
        return rangeToColorsMap[this.rangeString]
    }

    backGround() {
        const pair = this.gradientPair();
        return `linear-gradient(to right, ${pair[0]}, ${pair[1]})`
    }

}