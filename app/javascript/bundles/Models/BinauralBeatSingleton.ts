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
    description: string

    private static instance: BinauralBeatSingleton;

    public static get inMemory() {
        return BinauralBeatSingleton.instance != null
    }

    private constructor(binauralBeatState?: BinauralBeatState) {
        if (binauralBeatState) {
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
            description,
        } = binauralBeatState

        this.id = id
        this.editable = editable
        this.name = name
        this.volume = volume
        this.description = description
        // this.noiseSource = new NoiseSource(noiseLevel)
        this.beatOscillator = new BeatOscillator(
            beatOscillator
        )
        this.carrierOscillator = new CarrierOscillator(
            carrierOscillator,
            this.beatOscillator
        )

    }

    set playing(playing: boolean) {
        if (playing) {
            const pannerCarrier = new Panner(1).toDestination();
            this.carrierOscillator
                .toneOscillator = new Oscillator({
                frequency: this.carrierOscillator.frequency,
                type: 'sine',
                volume: -Infinity
            })
                .connect(pannerCarrier)
                .start()

            this.carrierOscillator
                .toneOscillator
                .volume
                .linearRampTo(
                    this.initialVolume,
                    1
                )

            const pannerBeat = new Panner(-1).toDestination();
            this.beatOscillator
                .toneOscillator = new Oscillator({
                frequency: this.beatOscillator.frequency,
                type: 'sine',
                volume: -Infinity
            })
                .connect(pannerBeat)
                .start()

            this.beatOscillator
                .toneOscillator
                .volume
                .linearRampTo(
                    this.initialVolume,
                    1
                )

        } else {
            this.carrierOscillator
                .toneOscillator
                .volume
                .linearRampTo(
                    -Infinity,
                    1
                )

            this.beatOscillator
                .toneOscillator
                .volume
                .linearRampTo(
                    -Infinity,
                    1
                )
        }
    }

    public static ins(binauralBeatState?: BinauralBeatState): BinauralBeatSingleton {
        if (!BinauralBeatSingleton.instance) {
            if (binauralBeatState) {
                BinauralBeatSingleton.instance = new BinauralBeatSingleton(binauralBeatState)
            } else {
                BinauralBeatSingleton.instance = new BinauralBeatSingleton()
            }
        } else if (binauralBeatState) {
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
        return `${symbol} ${freqName} ${this.name}`
    }

    toState(): BinauralBeatState {
        return {
            beatOscillator: this.beatOscillator.frequency,
            carrierOscillator: this.carrierOscillator.offset,
            volume: this.volume,
            name: this.name,
            noiseLevel: 0,
            id: this.id,
            editable: this.editable,
            description: this.description,
        }
    }

    get initialVolume(): number {
        if(this.volume <= -20) {
            return this.volume
        } else {
            return -20
        }
    }
}
