import {BaseContext, Oscillator} from 'tone'
import BetterOscillatorNode from "./BetterOscillatorNode";
import {AnyAudioContext} from "tone/build/esm/core/context/AudioContext";
import FunctionName from "../Utils/FunctionName";

interface Options {
    useAudioWorklet: boolean
    frequency: number,
    volume: number,
    context: AnyAudioContext
}

class OscillatorProxy {
    osc: Oscillator
    wOsc: BetterOscillatorNode
    useAudioWorklet: boolean
    audioContext: AnyAudioContext | AudioContext

    constructor(options: Options) {
        this.useAudioWorklet = options.useAudioWorklet
        this.audioContext = options.context


        if (this.useAudioWorklet) {
            this.wOsc = new BetterOscillatorNode(this.audioContext)
        } else {
            this.osc = new Oscillator({
                frequency: options.frequency,
                type: 'sine',
                volume: options.volume
            })
        }
    }

    connect(node: any, inputNum: number, outputNum: number) {
        outputNum = outputNum || 0
        inputNum = inputNum || 0

        if (this.useAudioWorklet) {
            // @ts-ignore
            this.wOsc.connect(node, inputNum, outputNum)
            return new AudioWorkletStartable(this, this.useAudioWorklet)

        } else {
            return this.osc.connect(node, inputNum, outputNum)
        }
    }

    get frequency() {
        if (this.useAudioWorklet) {
            //@ts-ignore
            return this.wOsc.parameters.get('frequency')
        } else if (this.wOsc != null) {
            // @ts-ignore
            return this.osc.frequency
        }
    }

    get volume() {
        if (this.useAudioWorklet) {
            return new wVolume(this.wOsc, this.audioContext)
        } else {
            return this.osc.volume

        }
    }

    stop() {
        if(this.useAudioWorklet) {
            return this.osc.stop()
        } else {
            //TODO
            console.log(`[${FunctionName()}]: Stop needs to be called on BetterOscillator`)
        }
    }
}


class wFrequency {
    wOsc: BetterOscillatorNode
    audioContext: AudioContext | AnyAudioContext
    frequency: any

    constructor(wOsc: BetterOscillatorNode, audioContext: AudioContext | AnyAudioContext) {
        this.wOsc = wOsc
        this.audioContext = audioContext
        // @ts-ignore
        this.frequency = wOsc.parameters.get('frequency')
    }

    rampTo(value: number, rampTime: number) {
        const time = this.audioContext.currentTime
        this.frequency.setValueAtTime(value, time + rampTime)
    }

    linearRampTo(value: number, rampTime: number) {
        const time = this.audioContext.currentTime
        this.frequency.linearRampToValueAtTime(value, time + rampTime)
    }

    toRaw() {
        return this.wOsc
    }
}

class wVolume extends wFrequency {
    audioContext: AudioContext | AnyAudioContext
    volume: any

    constructor(wOsc: BetterOscillatorNode, audioContext: AudioContext | AnyAudioContext) {
        super(wOsc, audioContext);

        this.audioContext = audioContext
        this.wOsc = wOsc

        //@ts-ignore
        this.volume = this.wOsc.parameters.get('volume')
    }

    rampTo(value: number, rampTime: number) {
        const time = this.audioContext.currentTime
        this.volume.setValueAtTime(value, time + rampTime)
    }

    linearRampTo(value: number, rampTime: number) {
        const time = this.audioContext.currentTime
        this.volume.linearRampToValueAtTime(value, time + rampTime)
    }


}

class AudioWorkletStartable {
    parentOscillatorProxy: OscillatorProxy
    useAudioWorklet: boolean

    constructor(parentOscillatorProxy: OscillatorProxy, useAudioWorklet: boolean) {
        this.parentOscillatorProxy = parentOscillatorProxy
        this.useAudioWorklet = useAudioWorklet
    }

    start(): OscillatorProxy {
        if (!this.useAudioWorklet) {
            this.parentOscillatorProxy.osc.start()
        }
        return this.parentOscillatorProxy
    }
}

export default OscillatorProxy