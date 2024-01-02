import {
    Oscillator,
    Noise,
    Gain,
    Merge,
    Context,
    setContext,
    getContext, BaseContext
} from 'tone';
import BeatOscillator from './BeatOscillator';
import CarrierOscillator from "./CarrierOscillator";
import BinauralBeatState from "../Types/BinauralBeatTypes";
import FrequencyRangeHelper from "../Helpers/FrequencyRangeHelper";
import FunctionName from "../Utils/FunctionName";
import BetterOscillatorNode from "./BetterOscillatorNode";
import OscillatorProxy from "./OscillatorProxy";
import MergerProxy from "./MergerProxy";

export default class BinauralBeat {

    public static carrierMinMax = [-40, 40]
    public static beatMinMax = [0, 1500]

    beatOscillator: BeatOscillator
    carrierOscillator: CarrierOscillator
    noiseSource: Noise
    merge: Merge | ChannelMergerNode
    volume: number = 0
    id: number
    name: string
    editable: boolean
    description: string
    noiseLevel: number
    isPlaying: boolean

    private static instance: BinauralBeat;

    public static get inMemory() {
        return BinauralBeat.instance != null
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
            beatOscillator,
        )
        this.carrierOscillator = new CarrierOscillator(
            carrierOscillator,
            this.beatOscillator
        )

    }

     playing(playing: boolean, useWhiteNoise: boolean, useAudioWorklet: boolean) {
        this.isPlaying = playing
        const context = getContext()

        if (playing) {
            if(useAudioWorklet) {
                context.rawContext.audioWorklet.addModule('/better-oscillator.js').then(() => {
                    this.setupAndPlayAudio(context, useWhiteNoise, useAudioWorklet)
                })
            } else {
                this.setupAndPlayAudio(context, useWhiteNoise, useAudioWorklet)
            }

        } else {
            this.carrierOscillator
                .oscillatorProxy
                .volume
                .linearRampTo(
                    -Infinity,
                    BinauralBeat.RAMPTIME
                )

            this.beatOscillator
                .oscillatorProxy
                .volume
                .linearRampTo(
                    -Infinity,
                    BinauralBeat.RAMPTIME
                )

            // Wait for fade out of audio then dispose
            setTimeout(() =>{
                this.carrierOscillator.oscillatorProxy.stop()
                this.beatOscillator.oscillatorProxy.stop()
                context.dispose()
            }, BinauralBeat.RAMPTIME * 1000)
        }
    }

    setupAndPlayAudio(context: BaseContext, useWhiteNoise: boolean, useAudioWorklet: boolean) {
        this.merge = new MergerProxy(context, useAudioWorklet).sourceMerger

        this.carrierOscillator
            .oscillatorProxy = new OscillatorProxy({
            useAudioWorklet: useAudioWorklet,
            frequency: this.carrierOscillator.frequency,
            volume: -999,
            context: context.rawContext
        })
            .connect(this.merge, 0, 0)
            .start()

        this.carrierOscillator
            .oscillatorProxy
            .volume
            .linearRampTo(
                this.initialVolume,
                BinauralBeat.RAMPTIME
            )

        this.beatOscillator
            .oscillatorProxy = new OscillatorProxy({
            useAudioWorklet: useAudioWorklet,
            frequency: this.beatOscillator.frequency,
            volume: -999,
            context: context.rawContext
        })
            .connect(this.merge, 0, 1)
            .start()

        this.beatOscillator
            .oscillatorProxy
            .volume
            .linearRampTo(
                this.initialVolume,
                BinauralBeat.RAMPTIME
            )

        if(useWhiteNoise) {
            this.noiseSource = new Noise({
                type: 'pink',
                volume: -Infinity
            }).toDestination().start()

            console.log(`[${FunctionName()}]: value of noiseLevel: ${Number(this.noiseLevel)}`)

            this.noiseSource.volume.linearRampTo(
                this.noiseLevel,
                BinauralBeat.RAMPTIME
            )
        }
    }

    public static ins(binauralBeatState?: BinauralBeatState): BinauralBeat {
        if (!BinauralBeat.instance) {
            if (binauralBeatState) {
                BinauralBeat.instance = new BinauralBeat(binauralBeatState)
            } else {
                BinauralBeat.instance = new BinauralBeat()
            }
        } else if (binauralBeatState) {
            BinauralBeat.instance.hydrateBeatState(binauralBeatState)
        }

        return BinauralBeat.instance;
    }

    generateTitle(): string {
        const symbol = FrequencyRangeHelper.rangeSymbol(
            this.carrierOscillator.offset
        )
        const freqName = FrequencyRangeHelper.displayRangeString(
            this.carrierOscillator.offset
        )
        return `<span style="color:#ffad00">${symbol} ${freqName}</span> ${this.name}`
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
