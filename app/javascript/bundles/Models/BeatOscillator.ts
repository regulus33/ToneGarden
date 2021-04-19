import { Oscillator } from "tone";

class BeatOscillator {

    frequency: number
    oscillator: Oscillator

    constructor(frequency: number) {
      this.oscillator = new Oscillator(frequency, "sine");
      this.frequency = frequency;
    }
}

export default BeatOscillator