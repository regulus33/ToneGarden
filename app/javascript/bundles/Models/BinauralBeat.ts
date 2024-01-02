import { Panner, Signal, Frequency} from 'tone';
import BeatOscillator from './BeatOscillator';

// TODO: check out audio panner.
// When you click a preset you should be immediately brough here and tones should ramp up
// https://tonejs.github.io/docs/14.7.77/Oscillator#channelInterpretation
export default class BinauralBeat {
    leftOscillator: BeatOscillator
    rightOscillator: BeatOscillator
    pannerLeft: Panner
    pannerRight: Panner
    playing: boolean = false

    private static instance: BinauralBeat;
    private static defaultLeft = 440;
    private static defaultRight = 420;

    private constructor(left: number, right: number) {
        this.leftOscillator = new BeatOscillator(left);
        this.rightOscillator = new BeatOscillator(right);
        this.panAndConnectOscillators();
    }

    public static getInstance(left?: number, right?:number): BinauralBeat {
        if (!BinauralBeat.instance) {
            BinauralBeat.instance = new BinauralBeat(
                left || BinauralBeat.defaultLeft,
                right || BinauralBeat.defaultRight
            );
        }

        return BinauralBeat.instance;
    }


    public panAndConnectOscillators(): void {
       if(this.playing) return;
       this.pannerLeft = new Panner(1).toDestination();
       this.pannerLeft.pan.rampTo(-1,0.5);
       this.leftOscillator.oscillator.connect(this.pannerLeft).start();

       this.pannerRight = new Panner(-1).toDestination()
       this.pannerRight.pan.rampTo(1, 0.5);
       this.rightOscillator.oscillator.connect(this.pannerRight).start();
       this.playing = true;
    }

    leftOscillatorMinMax(): Array<number> {
      return  [0, 1500]
    }

    rightOscillatorMinMax(): Array<number> {
       return [this.leftOscillator.frequency - 40, this.leftOscillator.frequency + 40]
    }

    updateLeftPitch(frequency: number){
        this.leftOscillator.oscillator.disconnect(this.pannerLeft)
        this.rightOscillator.oscillator.disconnect(this.pannerRight)
        this.leftOscillator.oscillator.dispose();
        this.rightOscillator.oscillator.dispose();
    }



}