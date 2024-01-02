import {
    Oscillator, Panner
} from 'tone';
import BeatOscillator from './BeatOscillator';
import CarrierOscillator from "./CarrierOscillator";
import BinauralBeatState from "../Types/BinauralBeatTypes";
// import NoiseSource from "./NoiseSource";
import FrequencyRangeHelper from "../Helpers/FrequencyRangeHelper";

export default class BinauralBeatSingleton {

    public static carrierMinMax = [-40, 40]
    public static beatMinMax = [0, 1500]

    beatOscillator: BeatOscillator
    carrierOscillator: CarrierOscillator
    // noiseSource: NoiseSource

    volume: number = 0
    id: number
    name: string
    editable: boolean

    private static instance: BinauralBeatSingleton;

    private constructor(binauralBeatState?: BinauralBeatState) {
        if(binauralBeatState) {
          this.hydrateBeatState(binauralBeatState)
        }

        this.toState = this.toState.bind(this)
    }

    hydrateBeatState(binauralBeatState: BinauralBeatState) {
        const {
            id,
            volume,
            noiseLevel,
            beatOscillator,
            carrierOscillator,
            editable,
            name,
        } = binauralBeatState

        this.id = id
        this.editable = editable
        this.name = name
        this.volume = volume
        // this.noiseSource = new NoiseSource(noiseLevel)
        this.beatOscillator = new BeatOscillator(beatOscillator)
        this.carrierOscillator = new CarrierOscillator(
            carrierOscillator,
            this.beatOscillator
        )

    }

    set playing(playing: boolean) {
        if(playing) {
            const pannerCarrier = new Panner(1).toDestination();
            this.carrierOscillator
                .toneOscillator =  new Oscillator(
                    this.carrierOscillator
                        .frequency, 'sine')
                .connect(pannerCarrier)
                .start()

            const pannerBeat = new Panner(-1).toDestination();
            this.beatOscillator
                .toneOscillator =  new Oscillator(
                    this.beatOscillator.frequency, 'sine')
                .connect(pannerBeat)
                .start()

        } else {
            this.carrierOscillator.toneOscillator.mute = true
            this.beatOscillator.toneOscillator.mute = true
        }
    }

    public static ins(binauralBeatState?: BinauralBeatState): BinauralBeatSingleton {
        if (!BinauralBeatSingleton.instance) {
            if(binauralBeatState) {
                BinauralBeatSingleton.instance = new BinauralBeatSingleton(binauralBeatState)
            } else {
                BinauralBeatSingleton.instance = new BinauralBeatSingleton()
            }
        } else if(binauralBeatState) {
            BinauralBeatSingleton.instance.hydrateBeatState(binauralBeatState)
        }

        return BinauralBeatSingleton.instance;
    }

    generateTitle(): string {
        const symbol = FrequencyRangeHelper.rangeSymbol(
            this.carrierOscillator.offset
        )
        const freqName = FrequencyRangeHelper.rangeString(
            this.carrierOscillator.offset
        )
       return `${symbol} ${freqName} ${this.name} `
    }

    toState(): BinauralBeatState {
        return {
            beatOscillator: this.beatOscillator.frequency,
            carrierOscillator: this.carrierOscillator.offset,
            volume: this.volume,
            name: this.name,
            noiseLevel: 0,
            id: this.id,
            editable: this.editable
        }
    }
}
