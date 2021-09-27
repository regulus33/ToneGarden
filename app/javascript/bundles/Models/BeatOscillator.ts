import { Oscillator } from "tone";
import CarrierOscillator from "./CarrierOscillator";
import BetterOscillatorNode from "./BetterOscillatorNode";
import OscillatorProxy from "./OscillatorProxy";

class BeatOscillator {
    frequency: number
    oscillatorProxy: OscillatorProxy | Oscillator
    carrierOscillator: CarrierOscillator
    source: 'worklet'

    constructor(frequency: number) {
      this.frequency = frequency
        // this is just a placeholder, needed for /create beat
        this.oscillatorProxy = new OscillatorProxy()
    }

    setFrequency(carrierOscillator: CarrierOscillator, newValue?: number) {
        let value = newValue
        if(!newValue) {
            console.log('BeatOscillator#setFrequency no value for newValue')
            console.log('BeatOscillator#setFrequency you are probably setting the carrier')
            value = this.frequency
        }

        // IMPORTANT: set frequency for BOTH frequency and oscillatorProxy.frequency
        this.frequency = value
        // @ts-ignore
        this.oscillatorProxy.frequency.rampTo(value, 0.5)

        if(!this.carrierOscillator) {
            this.carrierOscillator = carrierOscillator
        }
        this.carrierOscillator.setFrequencyFromBase(value)
    }

}

export default BeatOscillator