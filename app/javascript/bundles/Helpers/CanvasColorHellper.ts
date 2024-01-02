import FrequencyRangeHelper from "./FrequencyRangeHelper";
import Gradient from "../Models/Gradient";
import {BEAT_CANVAS_ID, CARRIER_CANVAS_ID} from "../Models/Constants";
import BinauralBeat from "../Models/BinauralBeat";
import Colors from "../Styles/Colors";
import {Theme} from "../State/ThemeContext";

class CanvasColorPair {
    beatColor: string
    carrierColor: string

    constructor(beatColor: string, carrierColor: string) {
        this.beatColor = beatColor
        this.carrierColor = carrierColor
    }
}

export default class CanvasColorHelper {
    static generateColorPair(carrierOscscillator: number, theme: Theme.Dark | Theme.Light): CanvasColorPair {
        const rangeString = FrequencyRangeHelper.rangeString(carrierOscscillator)
      if(theme === Theme.Dark) {
        return new CanvasColorPair(Colors.darkModeBeat, Colors.darkModeCarrier)
      }
      return new CanvasColorPair(Gradient.beatColor(rangeString), Gradient.carrierColor(rangeString))
    }
}
