import {
    Oscillator,
    Panner,
    Noise,
    Gain,
    Context,
    setContext,
    getContext
    // AutoFilter
} from 'tone';
import BeatOscillator from './BeatOscillator';
import CarrierOscillator from "./CarrierOscillator";
import BinauralBeatState from "../Types/BinauralBeatTypes";
import FrequencyRangeHelper from "../Helpers/FrequencyRangeHelper";

export default class BinauralBeatSingleton {

    public static carrierMinMax = [-40, 40]
    public static beatMinMax = [0, 1500]


    beatOscillator: BeatOscillator
    carrierOscillator: CarrierOscillator
    noiseSource: Noise
    // noiseFilter: AutoFilter // Someday...
    noiseGain: Gain
    volume: number = 0
    id: number
    name: string
    editable: boolean
    description: string
    noiseLevel: number

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
        this.noiseLevel = noiseLevel
        this.beatOscillator = new BeatOscillator(
            beatOscillator
        )
        this.carrierOscillator = new CarrierOscillator(
            carrierOscillator,
            this.beatOscillator
        )

    }

    set playing(playing: boolean) {
        const context = new Context({ latencyHint: "playback" });
        // set this context as the global Context
        setContext(context);
        // the global context is gettable with Tone.getContext()
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

            this.noiseGain = new Gain(0).toDestination()

            // this.noiseFilter = new AutoFilter({
            //     frequency: "0",
            //     baseFrequency: 100,
            //     octaves: 2
            // }).toDestination()

            this.noiseSource = new Noise(
                'pink'
            ).connect(
                this.noiseGain
            ).start()

            // this.noiseFilter.connect(this.noiseGain)

            this.noiseGain
                .gain
                .rampTo(this.noiseLevel,9)

            console.log(getContext().latencyHint);

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

            this.noiseGain.gain.rampTo(0, 1)
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
            noiseLevel: this.noiseLevel,
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
