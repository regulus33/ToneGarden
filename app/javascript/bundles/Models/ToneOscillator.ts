import CarrierToneOsc from "./BinauralBeat";
import BinauralBeat from "./BinauralBeat";
import CarrierOscillator from "./CarrierOscillator";
import {Theme} from "../State/ThemeContext";
import CanvasColorHelper from "../Helpers/CanvasColorHellper";

const ColorMap = {
  dark: {
    carrier: '#ffb700',
    beat: '#fffefe'
  },
  light: {
    carrier: '#01316e',
    beat: '#500693'
  }
}


export interface ToneProps {
    context: BaseAudioContext,
    canvas: HTMLCanvasElement,
    canvasWidth: number,
    canvasHeight: number,
    childOscillator?: CarrierOscillator,
    type: 'beat' | 'carrier',
    frequency?: number
}


class ToneOscillator {
  canvas: HTMLCanvasElement
  bodyElement: HTMLBodyElement
  canvasWidth: number;
  canvasHeight: number;
  oscillator: OscillatorNode
  context: BaseAudioContext
  analyser: AnalyserNode
  type: 'carrier' | 'beat' | 'default'
  childOscillator?: CarrierOscillator
  frequency: number

    static setCanvasColors(offset) {

    }

    constructor(props: ToneProps) {
        this.context = props.context
        this.canvas = props.canvas
        this.canvasWidth = props.canvasWidth
        this.canvasHeight = props.canvasHeight
        this.type = props.type
        this.childOscillator = props.childOscillator
        this.frequency = props.frequency
        this.bodyElement = document.getElementsByTagName('body')[0]
    }

    public getFrequency(): number {
        return this.frequency
    }

    setFrequencyToPlay(frequency: number) {
        this.frequency = frequency
        // ^ child oscillator has reference to this.frequency
        this.childOscillator.refreshFrequency()

        if(BinauralBeat.ins().playing) {
            this.oscillator.frequency.setValueAtTime(frequency, 0)
        }
    }

    private initialColor(): string {
      // TODO: make me more efficient
      const theme = Array.from(this.bodyElement.classList).find(c =>
        (c === Theme.Dark || c === Theme.Light)
      )
      return ColorMap[theme][this.type]
    }

    private get isBeat(): boolean {
        return this.type === 'beat'
    }

    public animate(): number {
        return requestAnimationFrame(this.vizualize.bind(this))
    }

    // This method is flick-triggered recursively and buffers in data from analyzer about the waveform
    private vizualize() {
        //Expand the canvas
        this.canvas.width = this.canvasWidth
        this.canvas.height = this.canvasHeight

        // Create a 2d rendering context for this canvas
        const drawContext = this.canvas.getContext('2d')

        // Create an array of unsigned 8bit integers
        // this basically becomes our visual buffer
        const array = new Uint8Array(this.analyser.frequencyBinCount)

        // Insert time domain data (a snapshot of the waveform as numbers) into our array
        this.analyser.getByteTimeDomainData(array)
        for (let i = 0; i < array.length; i++) {
            // Value is some number TODO: debug and inspect
            const value = array[i]
            // Scale the value to fit the box?
            const percent = value / 256
            // Scale
            const height = this.canvasHeight * percent
            // Some magic math here. canvasHeight (not this.canvasHeight) is a number in this array so it will
            // we oscillating up and down and that is why it doesn't exit the visible x, y plain
            const yCordinate = this.canvasHeight - height - 1
            // How wide would a bar need to be for all the bars in this array to fit in this rectangle?
            const xCordinate = this.canvasWidth / array.length

            drawContext.fillStyle = this.initialColor()
            // fillRect(x, y, 1, 1,)
            // xCordinate again is the exact amount of space necessary to draw each element in the array to perfectly FILL this rectangle.
            // yCordinate is the offset at which we should place our next point
            // last two args are the width and canvasHeight of the dot in pixels
            drawContext.fillRect(i * xCordinate, yCordinate, 1, 1)
        }
        requestAnimationFrame(this.vizualize.bind(this))
    }
}

export default ToneOscillator
