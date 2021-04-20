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

    setFrequency(value: number, carrierOscillator: CarrierOscillator) {
        this.toneOscillator.frequency.value = value;

        if(!this.carrierOscillator) {
            this.carrierOscillator = carrierOscillator;
        }

        this.carrierOscillator.setFrequencyFromBase(value);
    }

}

export default BeatOscillator