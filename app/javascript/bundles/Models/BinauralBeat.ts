import { Panner, Signal, Frequency, Context} from 'tone';
import BeatOscillator from './BeatOscillator';
import {number} from "prop-types";
import {ChangeEvent} from "react";
import CarrierOscillator from "./CarrierOscillator";

// TODO: check out audio panner.
// When you click a preset you should be immediately brough here and tones should ramp up
// https://tonejs.github.io/docs/14.7.77/Oscillator#channelInterpretation
export default class BinauralBeat {
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
        this.setBeatFrequency = this.setBeatFrequency.bind(this)
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

    leftOscillatorMinMax(): Array<number> {
      return  [0, 1500]
    }

    rightOscillatorMinMax(): Array<number> {
       return [this.beatOscillator.frequency - 40, this.beatOscillator.frequency + 40]
    }

    setBeatFrequency(event: ChangeEvent){
        const frequency = event.target.getAttribute('aria-valuenow')
        this.beatOscillator.setFrequency(Number(frequency), this.carrierOscillator)
    }

    updateRightPitch(event: ChangeEvent){
        // this.leftOscillator.oscillator.disconnect(this.pannerLeft)
        // this.rightOscillator.oscillator.disconnect(this.pannerRight)
        // this.leftOscillator.oscillator.dispose();
        // this.rightOscillator.oscillator.dispose();
    }





}