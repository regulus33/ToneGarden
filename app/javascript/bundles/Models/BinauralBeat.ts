import {Panner, Signal, Frequency, Context, Destination, getDestination, Volume, getContext} from 'tone';
import BeatOscillator from './BeatOscillator';
import CarrierOscillator from "./CarrierOscillator";
import {Dispatch} from "react";
import {BinauralBeatState} from "../State/BinauralBeatContext";
import NoiseSource from "./NoiseSource";

// TODO: check out audio panner.
// When you click a preset you should be immediately brought here and tones should ramp up
// https://tonejs.github.io/docs/14.7.77/Oscillator#channelInterpretation
export default class BinauralBeat {

    public static carrierMinMax = [-40,40]
    public static beatMinMax = [0,1500]

    beatOscillator: BeatOscillator
    carrierOscillator: CarrierOscillator
    pannerLeft: Panner
    pannerRight: Panner
    noiseSource: NoiseSource
    volume: number = 0
    playing: boolean = false

    private audioConnected: boolean = false

    setBinauralBeatState: Dispatch<BinauralBeatState>

    private static instance: BinauralBeat;
    private static defaultBeat = 440;
    private static defaultCarrier = 20;

    private constructor(beatFrequency: number, carrierOffset: number, noiseLevel?: number) {
        this.beatOscillator = new BeatOscillator(beatFrequency)
        this.carrierOscillator = new CarrierOscillator(carrierOffset, this.beatOscillator)
        this.noiseSource = new NoiseSource(12)

        this.onBeatFreqChange = this.onBeatFreqChange.bind(this)
        this.onCarrierFreqChange = this.onCarrierFreqChange.bind(this)
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.onVolumeChange = this.onVolumeChange.bind(this)
        this.toState = this.toState.bind(this)
        this.onNoiseLevelChange = this.onNoiseLevelChange.bind(this)
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

        this.pannerLeft = new Panner(1)
            .toDestination();

        this.pannerLeft
            .pan
            .rampTo(-1,0.0);

        this.beatOscillator
            .toneOscillator
            .connect(this.pannerLeft)
            .start();

        this.pannerRight = new Panner(-1)
            .toDestination()

        this.pannerRight
            .pan
            .rampTo(1, 0.0);

        this.carrierOscillator
            .toneOscillator
            .connect(this.pannerRight)
            .start();

        //NOISE
        this.noiseSource = new NoiseSource()
        this.noiseSource.toneNoise.toDestination()
        this.noiseSource.toneNoise.start()

        this.playing = true
        this.audioConnected = true
    }

    onBeatFreqChange(frequency: Number){
        this.beatOscillator.setFrequency(this.carrierOscillator, Number(frequency))
    }

    onCarrierFreqChange(offset: Number){
        this.carrierOscillator.offset = Number(offset)
        this.beatOscillator.setFrequency(this.carrierOscillator, null)
    }

    onVolumeChange(value: number) {
       getDestination().volume.value = value
       this.volume = value
    }

    pause(){
        getDestination().mute = true
        this.playing = false
        this.setBinauralBeatState(this.toState())
    }

    play(){
        if(this.audioConnected) {
            getDestination().mute = false
        } else {
            this.panAndConnectOscillators()
        }
        this.playing = true
        this.setBinauralBeatState(this.toState())
    }

    onNoiseLevelChange(value: number){
        console.log(`Noise level: ${value}`)
        this.noiseSource.toneNoise.volume.value = value
    }

    toState(): BinauralBeatState {
        return {
            playing: this.playing,
            beatOscillator: this.beatOscillator.frequency,
            carrierOscillator: this.carrierOscillator.offset,
            volume: this.volume,
        }
    }
}