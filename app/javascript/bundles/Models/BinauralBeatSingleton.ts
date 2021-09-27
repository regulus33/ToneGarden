import {
    Oscillator,
    Noise,
    Gain,
    Merge,
    Context,
    setContext,
    getContext, BaseContext
    // AutoFilter
} from 'tone';
import BeatOscillator from './BeatOscillator';
import CarrierOscillator from "./CarrierOscillator";
import BinauralBeatState from "../Types/BinauralBeatTypes";
import FrequencyRangeHelper from "../Helpers/FrequencyRangeHelper";
import FunctionName from "../Utils/FunctionName";
import BetterOscillatorNode from "./BetterOscillatorNode";
import OscillatorProxy from "./OscillatorProxy";
import MergerProxy from "./MergerProxy";

export default class BinauralBeatSingleton {

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
            beatOscillator,
        )
        this.carrierOscillator = new CarrierOscillator(
            carrierOscillator,
            this.beatOscillator
        )

    }

    playAudioWorklet = () => {
        // this.audioWorkletContext = new AudioContext()
        // this.audioWorkletContext.audioWorklet.addModule('/better-oscillator.js').then(() => {
        //     this.audioWorkletOscillator = new BetterOscillator(this.audioWorkletContext)
        // });
        // const audioContext = new AudioContext();
        // audioContext.audioWorklet.addModule('/better-oscillator.js').then(() => {
        //     const osc = new BetterOscillatorNode(audioContext);
        //     osc.connect(audioContext.destination)
        //     const freq = osc.parameters.get('frequency')
        //     const time = audioContext.currentTime
        //     freq.setValueAtTime(440, time + 1)
        //     freq.linearRampToValueAtTime(660, time + 1.5)
        //     setTimeout(()=>audioContext.close(), 5000)
        // });
    }

    getBetterOscillator(context) {
         return new BetterOscillatorNode(context);
    }

     playing(playing: boolean, useWhiteNoise: boolean, useAudioWorklet: boolean) {
        const context = getContext()
        if (playing) {
            if(useAudioWorklet) {
                context.rawContext.audioWorklet.addModule('/better-oscillator.js').then(() => {
                    this.setupAndPlayAudio(context, useWhiteNoise, useAudioWorklet)
                });
            } else {
                this.setupAndPlayAudio(context, useWhiteNoise, useAudioWorklet)
            }


        } else {
            this.carrierOscillator
                .oscillatorProxy
                .volume
                .linearRampTo(
                    -Infinity,
                    BinauralBeatSingleton.RAMPTIME
                )

            this.beatOscillator
                .oscillatorProxy
                .volume
                .linearRampTo(
                    -Infinity,
                    BinauralBeatSingleton.RAMPTIME
                )

            // Wait for fade out of audio then dispose
            setTimeout(() =>{
                this.carrierOscillator.oscillatorProxy.stop()
                this.beatOscillator.oscillatorProxy.stop()
                context.dispose()
            }, BinauralBeatSingleton.RAMPTIME * 1000)
        }
    }

    setupAndPlayAudio(context: BaseContext, useWhiteNoise: boolean, useAudioWorklet: boolean) {
        // audioContext.lookAhead = 0.1 #
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
                BinauralBeatSingleton.RAMPTIME
            )

        this.beatOscillator
            .oscillatorProxy = new OscillatorProxy({
            useAudioWorklet: useAudioWorklet,
            frequency: this.carrierOscillator.frequency,
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
                BinauralBeatSingleton.RAMPTIME
            )

        if(useWhiteNoise) {
            this.noiseSource = new Noise({
                type: 'pink',
                volume: -Infinity
            }).toDestination().start()

            console.log(`[${FunctionName()}]: value of noiseLevel: ${Number(this.noiseLevel)}`)

            this.noiseSource.volume.linearRampTo(
                this.noiseLevel,
                BinauralBeatSingleton.RAMPTIME
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
