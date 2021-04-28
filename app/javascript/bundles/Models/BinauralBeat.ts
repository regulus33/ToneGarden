import {Panner, Signal, Frequency, Context, Destination, getDestination} from 'tone';
import BeatOscillator from './BeatOscillator';
import CarrierOscillator from "./CarrierOscillator";

// TODO: check out audio panner.
// When you click a preset you should be immediately brought here and tones should ramp up
// https://tonejs.github.io/docs/14.7.77/Oscillator#channelInterpretation
export default class BinauralBeat {

    public static carrierMinMax = [0,40]
    public static beatMinMax = [0,1500]

    beatOscillator: BeatOscillator
    carrierOscillator: CarrierOscillator
    pannerLeft: Panner
    pannerRight: Panner
    playing: boolean = false

    private static instance: BinauralBeat;
    private static defaultBeat = 440;
    private static defaultCarrier = 20;

    private constructor(beatFrequency: number, carrierOffset: number) {
        this.beatOscillator = new BeatOscillator(beatFrequency);
        this.carrierOscillator = new CarrierOscillator(carrierOffset, this.beatOscillator);
        this.panAndConnectOscillators();

        this.onBeatFreqChange = this.onBeatFreqChange.bind(this)
        this.onCarrierFreqChange = this.onCarrierFreqChange.bind(this)
        this.play = this.play.bind(this)
    }

    public static getInstance(beat?: number, carrier?:number): BinauralBeat {
        if (!BinauralBeat.instance) {
            BinauralBeat.instance = new BinauralBeat(
                beat || BinauralBeat.defaultBeat,
                carrier  || BinauralBeat.defaultCarrier
            );
        }

        return BinauralBeat.instance;
    }


    public panAndConnectOscillators(): void {
       if(this.playing) return;
       this.pannerLeft = new Panner(1).toDestination();
       this.pannerLeft.pan.rampTo(-1,0.5);
       this.beatOscillator.toneOscillator.connect(this.pannerLeft).start();

       this.pannerRight = new Panner(-1).toDestination()
       this.pannerRight.pan.rampTo(1, 0.5);
       this.carrierOscillator.toneOscillator.connect(this.pannerRight).start();
       this.playing = true;
    }

    onBeatFreqChange(frequency: Number){
        this.beatOscillator.setFrequency(this.carrierOscillator, Number(frequency))
    }

    onCarrierFreqChange(offset: Number){
        this.carrierOscillator.offset = Number(offset)
        this.beatOscillator.setFrequency(this.carrierOscillator, null)
    }

    pause(){
        getDestination().mute = true
    }

    play(){
        if(this.playing) {
            console.log('trying to unmute')
            getDestination().mute = false
        } else {
            this.panAndConnectOscillators()
        }
    }

}