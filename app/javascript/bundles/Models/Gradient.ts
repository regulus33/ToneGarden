import Preset from "./Preset";

const rangeToColorsMap = {
    'alpha' : ['#0558ff', '#05ffe2'],
    'beta'  : ['#ff6105', '#ffb805'],
    'theta' : ['#2605ff', '#a600ff'],
    'gamma' : ['#05ff8a', '#00ccff'],
    'delta' : ['#ffc105', '#ff0084'],
}

export default class Gradient {

    private readonly rangeString: string;

    constructor(rangeString: string) {
        this.rangeString = rangeString;
    }

    gradientPair(){
       return rangeToColorsMap[this.rangeString]
    }

}