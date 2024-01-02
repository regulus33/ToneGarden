import {
    Noise,
    getContext,
    Filter,
} from 'tone';
// @ts-ignore
import ToneOscillator from "./ToneOscillator";
import CarrierOscillator from "./CarrierOscillator";
import BinauralBeatState from "../Types/BinauralBeatTypes";
import FrequencyRangeHelper from "../Helpers/FrequencyRangeHelper";
import CanvasColorHelper from "../Helpers/CanvasColorHellper";
import Colors from "../Styles/Colors";

export default class BinauralBeat {
    public static carrierMinMax = [-40, 40]
    public static beatMinMax = [0, 1500]

    beatOscillator: ToneOscillator
    carrierOscillator: CarrierOscillator
    beatPlayed: boolean = false

    volume: number
    id: number
    name: string
    editable: boolean
    description: string
    noiseLevel: number
    playing: boolean

    //New ToneOscillator stuff
    context: AudioContext
    channelMerger: ChannelMergerNode
    gain: GainNode
    carrierCanvas: HTMLCanvasElement
    beatCanvas: HTMLCanvasElement
    canvasWidth: number
    canvasHeight: number

    // For noise (optional feature)
    noiseSource: Noise
    noiseFilter: Filter

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

        // From BinauralBeats table
        this.id = id
        this.editable = editable
        this.name = name
        this.volume = volume
        this.description = description
        this.noiseLevel = noiseLevel

        // For audio api
        this.context = this.context || new AudioContext()

        // Visualization
        this.beatCanvas = document.getElementById('beatCanvas') as HTMLCanvasElement
        this.carrierCanvas = document.getElementById('carrierCanvas') as HTMLCanvasElement
        this.canvasWidth = this.carrierCanvas.width // we don't care which one, they are the same size
        this.canvasHeight = this.carrierCanvas.height


        const baseProps = {
            context: this.context,
            canvasHeight: this.canvasHeight,
            canvasWidth: this.canvasWidth,
        }

        const pair = CanvasColorHelper.generateColorPair(carrierOscillator)

        this.carrierOscillator = new CarrierOscillator({
                ...baseProps,
                canvas: this.carrierCanvas,
                initialColor: pair.carrierColor,
                type: 'carrier',
                frequency: beatOscillator,
                offset: carrierOscillator,
            }
        )

        this.beatOscillator = new ToneOscillator({
                ...baseProps,
                canvas: this.beatCanvas,
                initialColor: pair.beatColor,
                type: 'beat',
                frequency: beatOscillator,
                childOscillator: this.carrierOscillator
            }
        )

        // This is important!
        this.carrierOscillator.setParent(this.beatOscillator)
    }

    setPlayingState(playing: boolean, useWhiteNoise: boolean, useAudioWorklet: boolean) {
        this.playing = playing
        const context = getContext()

        if (playing) {
            this.beatPlayed = true
            this.playing = playing
            // Create analyzers
            this.carrierOscillator.analyser = this.context.createAnalyser()
            this.beatOscillator.analyser = this.context.createAnalyser()

            // Create web audio oscillator instances
            this.carrierOscillator.oscillator = this.context.createOscillator()
            this.beatOscillator.oscillator = this.context.createOscillator()


            //Setup visual graph
            this.carrierOscillator.oscillator.connect(this.carrierOscillator.analyser)
            this.beatOscillator.oscillator.connect(this.beatOscillator.analyser)

            // Set waveform
            this.beatOscillator.oscillator.type = 'sine'
            this.carrierOscillator.oscillator.type = 'sine'

            // Set initial frequency of oscillators
            this.beatOscillator.oscillator.frequency.value = this.beatOscillator.getFrequency()
            this.carrierOscillator.oscillator.frequency.value = this.carrierOscillator.getFrequency()

            // Set volume to 0 (no pops this way)
            this.gain = this.context.createGain()
            // this.gain.gain.value = 0

            // Create the stereo channel merger
            this.channelMerger = this.context.createChannelMerger(2)
            this.channelMerger.channelInterpretation = "discrete"

            // Send each oscillator to left or right speaker
            this.carrierOscillator.oscillator.connect(this.channelMerger, 0, 0)
            this.beatOscillator.oscillator.connect(this.channelMerger, 0, 1)


            this.channelMerger.connect(this.gain)
            this.gain.connect(this.context.destination)

            // Start the actual sound
            this.carrierOscillator.oscillator.start()
            this.beatOscillator.oscillator.start()

            // Visualize the sound for each osc
            this.carrierOscillator.animate()
            this.beatOscillator.animate()

            this.gain.gain.linearRampToValueAtTime(this.volume, BinauralBeat.RAMPTIME)

            if(useWhiteNoise) {
                this.noiseSource = new Noise("pink").start();
                const autoFilter = new Filter({
                    type: "lowpass",
                    frequency: 200,
                    gain: 0,
                }).toDestination()
                this.noiseSource.connect(autoFilter);
                this.noiseSource.start()
            }

        } else if(this.beatPlayed) {
            if(useWhiteNoise) {
                this.noiseSource.stop(0)
                this.noiseSource.dispose()
            }
            this.playing = false
            this.gain.gain.linearRampToValueAtTime(0, BinauralBeat.RAMPTIME)
            this.beatOscillator.oscillator.stop(0)
            this.carrierOscillator.oscillator.stop(0)
            this.gain.disconnect()
            this.channelMerger.disconnect()
            this.beatOscillator.oscillator.disconnect()
            this.carrierOscillator.oscillator.disconnect()
            this.beatOscillator.analyser.disconnect()
            this.carrierOscillator.analyser.disconnect()
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

    public generateTitle(): string {
        const symbol = FrequencyRangeHelper.rangeSymbol(
            this.carrierOscillator.offset
        )
        const freqName = FrequencyRangeHelper.displayRangeString(
            this.carrierOscillator.offset
        )
        return `<span style="color:${Colors.gold}">${symbol} ${freqName}</span> <span style="font-size: 1rem" class="titleText">${this.name}</span>`
    }

    public toState(): BinauralBeatState {
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
}
