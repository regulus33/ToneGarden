const rangeToColorsMap = {
    'delta': ['#7483cc', '#ffcc00'],
    'theta': ['#1aff00', '#9f89cb'],
    'alpha': ['#5e91ff', '#ff8800'],
    'beta': ['#2605ff', '#5e00ff'],
    'gamma': ['#2605ff', '#a600ff'],
}

export default class Gradient {
    static readonly rangeStrings = Object.keys(rangeToColorsMap)
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
        // Sliders sometimes return out of bounds numbers
        return rangeToColorsMap[this.rangeString][1]
    }

    backGround() {
        const pair = this.gradientPair();
        return `linear-gradient(to right, ${pair[0]}, ${pair[1]})`
    }

    rangeSymbolBackground() {
        const pair = this.gradientPair()
        return `linear-gradient(to right, ${pair[0]}, ${pair[1]} 90%)`
    }

    toProps() {
        return {
            secondaryColor: this.secondaryColor(),
            dominantColor: this.dominantColor(),
            dominantRgb: Gradient.hexToRgb(this.dominantColor()),
            secondaryRgb: Gradient.hexToRgb(this.secondaryColor())
        }
    }

    static beatColor(rangeString: string): string {
        switch(rangeString) {
            case 'delta':
                return '#2605ff'
            case 'theta':
                return '#2605ff'
            case 'alpha':
                return '#2605ff'
            case 'beta':
                return '#2605ff'
            case 'gamma':
                return '#2605ff'
        }
        return 'red'
    }

    static carrierColor(rangeString: string): string {
        switch(rangeString) {
            case 'delta':
                return '#ff72fc'
            case 'theta':
                return '#4a0050'
            case 'alpha':
                return '#3808d5'
            case 'beta':
                return '#5e00ff'
            case 'gamma':
                return '#a600ff'
        }
        return 'green'
    }

    private static hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

}
