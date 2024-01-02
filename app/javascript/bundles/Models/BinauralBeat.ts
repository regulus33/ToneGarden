import {
    Panner,
    getDestination,
} from 'tone';
import BeatOscillator from './BeatOscillator';
import CarrierOscillator from "./CarrierOscillator";
import {BinauralBeatState, useBinauralBeat} from "../State/BinauralBeatContext";
import NoiseSource from "./NoiseSource";
import FrequencyRangeHelper from "../Helpers/FrequencyRangeHelper";

export default class BinauralBeat {

    public static carrierMinMax = [-40, 40]
    public static beatMinMax = [0, 1500]

    beatOscillator: BeatOscillator
    carrierOscillator: CarrierOscillator
    pannerLeft: Panner
    pannerRight: Panner
    noiseSource: NoiseSource

    volume: number = 0
    id: number
    name: string
    editable: boolean
    playing: boolean

    private static instance: BinauralBeat;

    private constructor(binauralBeatState?: BinauralBeatState) {
        if(binauralBeatState) {
          this.hydrateFromState(binauralBeatState)
        }

        this.toState = this.toState.bind(this)
    }

    hydrateFromState(binauralBeatState: BinauralBeatState) {
        const {
            id,
            volume,
            noiseLevel,
            beatOscillator,
            carrierOscillator,
            editable,
            name,
            playing,
        } = binauralBeatState

        this.id = id
        this.editable = editable
        this.name = name
        this.playing = playing
        this.volume = volume
        this.noiseSource = new NoiseSource(noiseLevel)
        this.beatOscillator = new BeatOscillator(beatOscillator)
        this.carrierOscillator = new CarrierOscillator(
            carrierOscillator,
            this.beatOscillator
        )

    }

    public static getInstance(binauralBeatState?: BinauralBeatState): BinauralBeat {
        if (!BinauralBeat.instance) {
            BinauralBeat.instance = new BinauralBeat(binauralBeatState)
        } else if(binauralBeatState) {
            BinauralBeat.instance.hydrateFromState(binauralBeatState)
        }

        return BinauralBeat.instance;
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
            playing: this.playing,
            beatOscillator: this.beatOscillator.frequency,
            carrierOscillator: this.carrierOscillator.offset,
            volume: this.volume,
            name: this.name,
            noiseLevel: this.noiseSource.level,
            id: this.id,
            editable: this.editable
        }
    }
}
