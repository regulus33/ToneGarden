import {Oscillator} from "tone";
import BeatOscillator from "./BeatOscillator";

class CarrierOscillator {
    offset: number
    toneOscillator: Oscillator
    beatOscillator: BeatOscillator

    constructor(offset: number, beatOscillator: BeatOscillator) {
        this.offset = offset;
        this.beatOscillator = beatOscillator;
        this.toneOscillator = new Oscillator(this.frequency, "sine");
    }

    get frequency(): number {
        return this.beatOscillator.frequency + this.offset
    }

    setFrequencyFromBase(newValue: number) {
        const newValueSet = newValue + this.offset
        console.log(newValueSet)
        this.toneOscillator
            .frequency
            .rampTo(
                newValueSet,
                0.5
            )
    }

}

export default CarrierOscillator