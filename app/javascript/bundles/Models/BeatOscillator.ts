import { Oscillator } from "tone";
import CarrierOscillator from "./CarrierOscillator";

class BeatOscillator {
    frequency: number
    toneOscillator: Oscillator
    carrierOscillator: CarrierOscillator

    constructor(frequency: number) {
      this.toneOscillator = new Oscillator(frequency, "sine");
      this.frequency = frequency;
    }

    setFrequency(carrierOscillator: CarrierOscillator, newValue?: number) {
        let value = newValue
        if(!newValue) {
            console.log('BeatOscillator#setFrequency no value for newValue')
            console.log('BeatOscillator#setFrequency you are probably setting the carrier')
            value = this.frequency
        }

        // IMPORTANT: set frequency for BOTH frequency and toneOscillator.frequency
        this.frequency = value
        this.toneOscillator.frequency.rampTo(value, 0.5)

        if(!this.carrierOscillator) {
            this.carrierOscillator = carrierOscillator
        }
        this.carrierOscillator.setFrequencyFromBase(value)
    }

}

export default BeatOscillator