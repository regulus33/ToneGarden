import { AudioWorkletNode } from 'standardized-audio-context'
import {AnyAudioContext} from "tone/build/esm/core/context/AudioContext";

// @ts-ignore
class BetterOscillatorNode extends  AudioWorkletNode {
    constructor(context: AudioContext | AnyAudioContext) {
        super(context, 'better-oscillator')
    }
}

export default BetterOscillatorNode