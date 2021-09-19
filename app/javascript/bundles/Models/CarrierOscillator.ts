import {Oscillator} from "tone";
import BeatOscillator from "./BeatOscillator";
import OscillatorProxy from "./OscillatorProxy";

class CarrierOscillator {
    offset: number
    oscillatorSource: OscillatorProxy | Oscillator
    beatOscillator: BeatOscillator

    constructor(offset: number, beatOscillator: BeatOscillator) {
        this.offset = offset;
        this.beatOscillator = beatOscillator;
    }

    get frequency(): number {
        return this.beatOscillator.frequency + this.offset
    }

    setFrequencyFromBase(newValue: number) {
        const newValueSet = newValue + this.offset
        console.log(newValueSet)
        this.oscillatorSource
            .frequency
            .rampTo(
                newValueSet,
                0.5
            )
    }

}

export default CarrierOscillator