import ToneOscillator, {ToneProps} from "./ToneOscillator";
import BinauralBeat from "./BinauralBeat";

interface CarrierProps extends ToneProps {
    offset: number,
    parent?: ToneOscillator
}

class CarrierOscillator extends ToneOscillator {
    offset: number
    parent: ToneOscillator

    constructor(props: CarrierProps) {
        super(props)
        this.offset = props.offset
    }

    validate(props: CarrierProps) {
        if (props.offset === undefined) {
            throw 'Oscillator cannot be carrier with no offset'
        } else if (Math.abs(props.offset) > 40) {
            throw 'Carrier offset too high: ' + props.offset
        }
    }

    // Returns parent freq plus my offset
    getFrequency(): number {
        if (!!this.parent) return this.parent.frequency + this.offset
        return this.frequency + this.offset
    }

    setParent(parent: ToneOscillator) {
        this.parent = parent
    }

    setOffsetToPlay(offset: number) {
        // Make sure we save offset in mem (for persistance later)
        this.offset = offset
        if(BinauralBeat.ins().playing) {
            this.oscillator.frequency.setValueAtTime(this.getFrequency(), 0)
        }
    }

    setFrequencyToPlay(value: number) {
        return console.warn('Error: this is a carrier oscillator, only setOffsetToPlay allowed here')
    }

    // Parent calls this when he changes freq
    public refreshFrequency() {
        if(BinauralBeat.ins().playing) {
            this.oscillator.frequency.setValueAtTime(this.getFrequency(), 0)
        }
    }

}

export default CarrierOscillator