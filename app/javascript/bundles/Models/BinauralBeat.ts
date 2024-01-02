import {
    Panner,
    getDestination,
} from 'tone';
import BeatOscillator from './BeatOscillator';
import CarrierOscillator from "./CarrierOscillator";
import {Dispatch, SetStateAction} from "react";
import {BinauralBeatState, useBinauralBeat} from "../State/BinauralBeatContext";
import NoiseSource from "./NoiseSource";
import Gradient from "./Gradient";
import FrequencyRangeHelper from "../Helpers/FrequencyRangeHelper";

export default class BinauralBeat {

    public static carrierMinMax = [-40, 40]
    public static beatMinMax = [0, 1500]

    beatOscillator: BeatOscillator
    carrierOscillator: CarrierOscillator
    pannerLeft: Panner
    pannerRight: Panner
    noiseSource: NoiseSource

    volume: number = 0
    id: number
    name: string
    editable: boolean
    playing: boolean

    setBinauralBeatState: Dispatch<BinauralBeatState>
    setTitle: Dispatch<SetStateAction<string>>
    setGradient: Dispatch<Gradient>

    private static instance: BinauralBeat;

    private constructor(binauralBeatState?: BinauralBeatState) {
        if(binauralBeatState) {
          this.hydrateFromState(binauralBeatState)
        }

        this.onBeatFreqChange = this.onBeatFreqChange.bind(this)
        this.onCarrierFreqChange = this.onCarrierFreqChange.bind(this)
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.onVolumeChange = this.onVolumeChange.bind(this)
        this.toState = this.toState.bind(this)
        this.onNoiseLevelChange = this.onNoiseLevelChange.bind(this)
        this.onPitchSliderBlur = this.onPitchSliderBlur.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
    }

    hydrateFromState(binauralBeatState: BinauralBeatState) {
        const {
            id,
            volume,
            noiseLevel,
            beatOscillator,
            carrierOscillator,
            editable,
            name,
            playing,
        } = binauralBeatState

        this.id = id
        this.editable = editable
        this.name = name
        this.playing = playing
        this.volume = volume
        this.noiseSource = new NoiseSource(noiseLevel)
        this.beatOscillator = new BeatOscillator(beatOscillator)
        this.carrierOscillator = new CarrierOscillator(
            carrierOscillator,
            this.beatOscillator
        )

    }

    public static getInstance(binauralBeatState?: BinauralBeatState): BinauralBeat {
        if (!BinauralBeat.instance) {
            BinauralBeat.instance = new BinauralBeat(binauralBeatState)
        } else if(binauralBeatState) {
            BinauralBeat.instance.hydrateFromState(binauralBeatState)
        }

        return BinauralBeat.instance;
    }

    onBeatFreqChange(frequency: Number) {
        this.beatOscillator.setFrequency(this.carrierOscillator, Number(frequency))
    }

    onCarrierFreqChange(offset: Number) {
        this.carrierOscillator.offset = Number(offset)
        this.beatOscillator.setFrequency(this.carrierOscillator, null)
        console.log(this.beatOscillator.toneOscillator.frequency.value);
    }

    onPitchSliderBlur(offset: number) {
        this.setBinauralBeatState(this.toState())
        this.setTitle(this.generateTitle())
        this.setGradient(
            FrequencyRangeHelper
                .generateGradient(
                    this
                        .carrierOscillator
                        .offset
                )
        )
    }

    generateTitle(): string {
        const symbol = FrequencyRangeHelper.rangeSymbol(
            this.carrierOscillator.offset
        )
        const freqName = FrequencyRangeHelper.rangeString(
            this.carrierOscillator.offset
        )
       return `${symbol} ${freqName} ${this.name} `
    }

    onVolumeChange(value: number) {
        getDestination().volume.value = value
        this.volume = value
        this.setBinauralBeatState(this.toState())
    }

    onNameChange(name) {
        this.name = name
        this.setTitle(this.generateTitle())
        this.setBinauralBeatState(this.toState())
    }

    pause() {
        this.playing = false
        this.setBinauralBeatState(this.toState())
    }

    play() {
        this.playing = true
        this.setBinauralBeatState(this.toState())
    }

    onNoiseLevelChange(value: number) {
        console.log(`Noise level: ${value}`)
        this.noiseSource.toneNoise.volume.value = value
        this.setBinauralBeatState(this.toState())
    }

    toState(): BinauralBeatState {
        return {
            playing: this.playing,
            beatOscillator: this.beatOscillator.frequency,
            carrierOscillator: this.carrierOscillator.offset,
            volume: this.volume,
            name: this.name,
            noiseLevel: this.noiseSource.level,
            id: this.id,
            editable: this.editable
        }
    }
}
