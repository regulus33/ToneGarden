const rangeToColorsMap = {
    'alpha': ['#0558ff', '#05ffe2'],
    'beta': ['#ff3d0a', '#ffb805'],
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

    dominantColor() {
        return rangeToColorsMap[this.rangeString][0]
    }

    secondaryColor(){
        return rangeToColorsMap[this.rangeString][1]
    }

    backGround() {
        const pair = this.gradientPair();
        return `linear-gradient(to right, ${pair[0]}, ${pair[1]})`
    }

    toProps() {
        return {
            secondaryColor: this.secondaryColor(),
            dominantColor: this.dominantColor()
        }
    }

}