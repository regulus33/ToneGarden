import BetterOscillatorNode from "./BetterOscillatorNode";
import {Merge, Oscillator} from "tone";

class MergerProxy {
    context: BaseAudioContext
    useAudioWorklet: boolean

    constructor(context, useAudioWorklet: boolean) {
        this.context = context.rawContext
        this.useAudioWorklet = useAudioWorklet
    }

    get sourceMerger() {
        if(this.useAudioWorklet) {
            return this.context.createChannelMerger(2)
        } else {
            return new Merge(2).toDestination()
        }
    }
}


export default MergerProxy