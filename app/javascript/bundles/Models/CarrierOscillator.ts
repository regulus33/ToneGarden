import {getContext, Oscillator} from "tone";
import BeatOscillator from "./BeatOscillator";
import OscillatorProxy from "./OscillatorProxy";
import {AnyAudioContext} from "tone/build/esm/core/context/AudioContext";

class CarrierOscillator {
    offset: number
    oscillatorProxy: OscillatorProxy | Oscillator
    beatOscillator: BeatOscillator

    constructor(offset: number, beatOscillator: BeatOscillator) {
        this.offset = offset
        this.beatOscillator = beatOscillator
        // this is just a placeholder, needed for /create beat
        this.oscillatorProxy = new OscillatorProxy()
    }

    get frequency(): number {
        return this.beatOscillator.frequency + this.offset
    }

    setFrequencyFromBase(newValue: number) {
        const newValueSet = newValue + this.offset
        console.log(newValueSet)
        this.oscillatorProxy
            .frequency
            .rampTo(
                newValueSet,
                0.5
            )
    }

}

export default CarrierOscillator