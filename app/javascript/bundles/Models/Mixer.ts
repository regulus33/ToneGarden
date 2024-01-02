import { Oscillator, Panner} from 'tone';
// TODO: check out audio panner.
// When you click a preset you should be immediately brough here and tones should ramp up
// https://tonejs.github.io/docs/14.7.77/Oscillator#channelInterpretation
export default class Mixer {
    leftOscillator: Oscillator
    rightOscillator: Oscillator

    constructor(left: number, right: number) {
        this.leftOscillator = new Oscillator(left, "sine1");
        this.rightOscillator = new Oscillator(right, "sine1");
        this.panAndConnectOscillators();
    }

    panAndConnectOscillators() {
       const pannerLeft = new Panner(1).toDestination();
       pannerLeft.pan.rampTo(-1,0.5);
       this.leftOscillator.connect(pannerLeft).start();

       const pannerRight = new Panner(-1).toDestination()
        pannerRight.pan.rampTo(1, 0.5);

       this.rightOscillator.connect(pannerRight).start();
    }



}