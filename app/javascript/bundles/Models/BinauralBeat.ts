import {Panner, Signal, Frequency, Context, Destination, getDestination, Volume, getContext, Waveform, Meter, FFT} from 'tone';
import BeatOscillator from './BeatOscillator';
import CarrierOscillator from "./CarrierOscillator";
import {Dispatch, SetStateAction} from "react";
import {BinauralBeatState} from "../State/BinauralBeatContext";
import NoiseSource from "./NoiseSource";
import Gradient from "./Gradient";
import SecureStorageService, {SecureStorageType} from "../Network/SecureStorageService";

const symbolMap = {
    'alpha': 'α',
    'beta':  'β',
    'delta': 'δ',
    'theta': 'ϴ',
    'gamma': 'γ'
}

const rangeMap = {
    'alpha': [8, 13],
    'beta': [14, 29],
    'delta': [0.1, 3],
    'theta': [4, 7],
    'gamma': [30, 39]
}

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

    setBinauralBeatState: Dispatch<BinauralBeatState>
    setTitle: Dispatch<SetStateAction<string>>
    setGradient: Dispatch<Gradient>

    private static instance: BinauralBeat;

    private constructor(binauralBeatState: BinauralBeatState) {
        this.convertBeatStateToSound(binauralBeatState)
    }

    convertBeatStateToSound(binauralBeatState: BinauralBeatState) {
        const {
            volume,
            noiseLevel,
            beatOscillator,
            carrierOscillator
        } = binauralBeatState

        this.volume = volume

        this.beatOscillator = new BeatOscillator(beatOscillator)
        this.carrierOscillator = new CarrierOscillator(
            carrierOscillator,
            this.beatOscillator
        )
        this.noiseSource = new NoiseSource(noiseLevel)

        this.onBeatFreqChange = this.onBeatFreqChange.bind(this)
        this.onCarrierFreqChange = this.onCarrierFreqChange.bind(this)
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.onVolumeChange = this.onVolumeChange.bind(this)
        this.toState = this.toState.bind(this)
        this.onNoiseLevelChange = this.onNoiseLevelChange.bind(this)
        this.onPitchSliderBlur = this.onPitchSliderBlur.bind(this)
    }

    public static getInstance(binauralBeatState: BinauralBeatState): BinauralBeat {
        if (!BinauralBeat.instance) {
            BinauralBeat.instance = new BinauralBeat(binauralBeatState)
        } else {
            BinauralBeat.instance.convertBeatStateToSound(binauralBeatState)
            BinauralBeat.instance.panAndConnectOscillators()
        }

        return BinauralBeat.instance;
    }

    set isPlaying(is: boolean) {
        SecureStorageService.setIsPlaying(is)
    }

    get isPlaying(): boolean {
        return SecureStorageService.getIsPlaying()
    }

    get audioConnected(): boolean {
        return SecureStorageService.getAudioConnected()
    }

    set audioConnected(connected) {
        SecureStorageService.setAudioConnected(connected)
    }

    public panAndConnectOscillators(): void {
        if(this.audioConnected) return;

        this.pannerLeft = new Panner(1)
            .toDestination();

        this.pannerLeft
            .pan
            .rampTo(-1, 0.0);

        this.beatOscillator
            .toneOscillator
            .connect(this.pannerLeft)
            .start();

        this.pannerRight = new Panner(-1)
            .toDestination()

        this.pannerRight
            .pan
            .rampTo(1, 0.0);

        this.carrierOscillator
            .toneOscillator
            .connect(this.pannerRight)
            .start();
        //NOISE
        // this.noiseSource = new NoiseSource()
        // this.noiseSource.toneNoise.toDestination()

        // this.noiseSource.toneNoise.start()
        this.audioConnected = true
    }

    playing() {

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
            BinauralBeat
                .gradient(
                    this
                        .carrierOscillator
                        .offset
                )
        )
    }

    private generateTitle(): string {
        return BinauralBeat.rangeSymbol(
            this.carrierOscillator.offset
        ) + BinauralBeat.rangeString(
            this.carrierOscillator.offset
        )
    }

    onVolumeChange(value: number) {
        getDestination().volume.value = value
        this.volume = value
        this.setBinauralBeatState(this.toState())
    }

    pause() {
        getDestination().mute = true
        this.isPlaying = false
        this.setBinauralBeatState(this.toState())
    }

    play() {
        if (this.audioConnected) {
            getDestination().mute = false
        } else {
            this.panAndConnectOscillators()
        }
        this.isPlaying = true
        this.setBinauralBeatState(this.toState())
    }

    onNoiseLevelChange(value: number) {
        console.log(`Noise level: ${value}`)
        this.noiseSource.toneNoise.volume.value = value
        this.setBinauralBeatState(this.toState())
    }

    toState(): BinauralBeatState {
        return {
            playing: this.isPlaying,
            beatOscillator: this.beatOscillator.frequency,
            carrierOscillator: this.carrierOscillator.offset,
            volume: this.volume,
            name: this.name,
            noiseLevel: this.noiseSource.level,
            id: this.id,
            editable: this.editable
        }
    }

    static rangeSymbol(offset: number): string {
        return symbolMap[BinauralBeat.rangeString(offset)]
    }

    static rangeString(offset: number): string {
        offset = Math.abs(offset)
        if (offset > 40)
            return `Halt! offset out of bounds: ${offset}`
        if (this.isInRange(offset, rangeMap['alpha'])) {
            return 'alpha';
        }
        if (this.isInRange(offset, rangeMap['beta'])) {
            return 'beta';
        }
        if (this.isInRange(offset, rangeMap['gamma'])) {
            return 'gamma';
        }
        if (this.isInRange(offset, rangeMap['theta'])) {
            return 'theta';
        }
        if (this.isInRange(offset, rangeMap['delta'])) {
            return 'delta';
        }
        return 'NA';
    }

    static isInRange(num: number, range: number[]): boolean {
        return num >= range[0] && num <= range[1];
    }

    static gradient(offset: number) {
        return new Gradient(BinauralBeat.rangeString(offset));
    }

    audio(){

    }

}
