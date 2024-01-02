import FrequencyRangeHelper from "./FrequencyRangeHelper";
import Gradient from "../Models/Gradient";
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
    // Abandoned idea where every frequency range had associated colors for both channels
    static generateColorPair(carrierOscscillator: number, theme: Theme.Dark | Theme.Light): CanvasColorPair {
        const rangeString = FrequencyRangeHelper.rangeString(carrierOscscillator)
      if(theme === Theme.Dark) {
        return new CanvasColorPair(Colors.darkModeBeat, Colors.darkModeCarrier)
      }
      return new CanvasColorPair(Gradient.beatColor(rangeString), Gradient.carrierColor(rangeString))
    }
}
