import {Oscillator} from 'tone';
// TODO: check out audio panner.
// When you click a preset you should be immediately brough here and tones should ramp up
// https://tonejs.github.io/docs/14.7.77/Oscillator#channelInterpretation
class Mixer {
    leftOscillator: Oscillator
    rightOscillator: Oscillator

    constructor(leftHertz: number, rightHertz: number) {
        this.leftOscillator = new Oscillator(leftHertz, "sine").toDestination().start();
        this.rightOscillator = new Oscillator(rightHertz, "sine").toDestination().start();
    }

}