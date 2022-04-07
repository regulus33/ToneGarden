import FrequencyRangeHelper from "./FrequencyRangeHelper";
import Gradient from "../Models/Gradient";
import {BEAT_CANVAS_ID, CARRIER_CANVAS_ID} from "../Models/Constants";
import BinauralBeat from "../Models/BinauralBeat";

class CanvasColorPair {
    beatColor: string
    carrierColor: string

    constructor(beatColor: string, carrierColor: string) {
        this.beatColor = beatColor
        this.carrierColor = carrierColor
    }
}

export default class CanvasColorHelper {
    static generateColorPair(carrierOscscillator: number): CanvasColorPair {
        const rangeString = FrequencyRangeHelper.rangeString(carrierOscscillator)
        // return new CanvasColorPair(Gradient.beatColor(rangeString), Gradient.carrierColor(rangeString))
        // TODO: ei
        return new CanvasColorPair('white', 'red')
    }

    static setCanvasColorForBeats(beatColor: string, carrierColor: string) {
        BinauralBeat.ins().carrierOscillator.initialColor = carrierColor
        BinauralBeat.ins().beatOscillator.initialColor = beatColor
    }
}
