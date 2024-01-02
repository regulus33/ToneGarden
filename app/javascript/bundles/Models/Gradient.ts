const rangeToColorsMap = {
    'alpha': ['#6D5959', '#a03a3a'],
    'beta': ['#00a6a6', '#a2fffc'],
    'theta': ['#2605ff', '#a600ff'],
    'gamma': ['#983628', '#e2aedd'],
    'delta': ['#8800ff', '#0593ff'],
}

export default class Gradient {

    private readonly rangeString: string;

    constructor(rangeString: string) {
        console.log(rangeString)
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