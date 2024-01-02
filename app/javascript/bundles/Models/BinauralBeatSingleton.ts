import {
    Oscillator,
    Noise,
    Gain,
    Merge,
    Context,
    setContext,
    getContext
    // AutoFilter
} from 'tone';
import BeatOscillator from './BeatOscillator';
import CarrierOscillator from "./CarrierOscillator";
import BinauralBeatState from "../Types/BinauralBeatTypes";
import FrequencyRangeHelper from "../Helpers/FrequencyRangeHelper";
import FunctionName from "../Utils/FunctionName";

export default class BinauralBeatSingleton {

    public static carrierMinMax = [-40, 40]
    public static beatMinMax = [0, 1500]


    beatOscillator: BeatOscillator
    carrierOscillator: CarrierOscillator
    noiseSource: Noise
    merge: Merge
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

    public static RAMPTIME = 1

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
        if (playing) {
            getContext().lookAhead = 0.1
            this.merge = new Merge(2).toDestination()

            this.carrierOscillator
                .toneOscillator = new Oscillator({
                frequency: this.carrierOscillator.frequency,
                type: 'sine',
                volume: -999
            })
                .connect(this.merge, 0, 0)
                .start()

            this.carrierOscillator
                .toneOscillator
                .volume
                .linearRampTo(
                    this.initialVolume,
                    BinauralBeatSingleton.RAMPTIME
                )

            this.beatOscillator
                .toneOscillator = new Oscillator({
                frequency: this.beatOscillator.frequency,
                type: 'sine',
                volume: -999
            })
                .connect(this.merge, 0, 1)
                .start()

            this.beatOscillator
                .toneOscillator
                .volume
                .linearRampTo(
                    this.initialVolume,
                    BinauralBeatSingleton.RAMPTIME
                )
            // Too much complexity for now. we leave it out until we have beats perfect
            // this.noiseSource = new Noise({
            //     type: 'pink',
            //     volume: -Infinity
            // }).toDestination().start()
            //
            // console.log(`[${FunctionName()}]: value of noiseLevel: ${Number(this.noiseLevel)}`)
            //
            // this.noiseSource.volume.linearRampTo(
            //     this.noiseLevel,
            //     BinauralBeatSingleton.RAMPTIME
            // )


        } else {
            this.carrierOscillator
                .toneOscillator
                .volume
                .linearRampTo(
                    -Infinity,
                    BinauralBeatSingleton.RAMPTIME
                )

            this.beatOscillator
                .toneOscillator
                .volume
                .linearRampTo(
                    -Infinity,
                    BinauralBeatSingleton.RAMPTIME
                )

            // Wait for fade out of audio then dispose
            setTimeout(() =>{
                this.carrierOscillator.toneOscillator.stop()
                this.beatOscillator.toneOscillator.stop()
                getContext().dispose()
            }, BinauralBeatSingleton.RAMPTIME * 1000)
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
