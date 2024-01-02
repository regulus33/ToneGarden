import Gradient from "../Models/Gradient";

const symbolMap = {
    'alpha': 'α',
    'beta': 'β',
    'delta': 'δ',
    'theta': 'ϴ',
    'gamma': 'γ'
}

const rangeMap = {
    'delta': [0, 3],
    'theta': [4, 7],
    'alpha': [8, 12],
    'beta': [13, 29],
    'gamma': [30, 40]
}

class FrequencyRangeHelper {
    static rangeSymbol(offset: number): string {
        return symbolMap[FrequencyRangeHelper.rangeString(offset)]
    }

    static rangeString(offset: number): string {
        offset = Math.abs(offset)
        if (offset > 40)
            return `Halt! offset out of bounds: ${offset}`
        if (this.isInRange(offset, rangeMap['alpha'])) {
            return 'alpha';
        }
        if (this.isInRange(offset, rangeMap['beta'])) {
            return 'beta';
        }
        if (this.isInRange(offset, rangeMap['gamma'])) {
            return 'gamma';
        }
        if (this.isInRange(offset, rangeMap['theta'])) {
            return 'theta';
        }
        if (this.isInRange(offset, rangeMap['delta'])) {
            return 'delta';
        }

        return 'NA';
    }

    static isInRange(num: number, range: number[]): boolean {
        return num >= range[0] && num <= range[1];
    }

    static generateGradient(offset: number) {
        console.log("offset sent to generateGradient" + offset)
        return new Gradient(FrequencyRangeHelper.rangeString(offset));
    }
}

export default FrequencyRangeHelper