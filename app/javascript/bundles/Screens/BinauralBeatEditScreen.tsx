import NetworkService from "../Network/NetworkService"
import * as React from 'react'
import {useEffect, useState} from 'react'
import Routes from "../Network/Routes"
import {useHistory, useParams} from 'react-router-dom'
import BinauralBeat from '../Models/BinauralBeat'
import useStyles from '../Styles/StylesPresetShowScreen'
import {useGradient} from "../State/GradientContext"
import Paper from '@mui/material/Paper'
import PitchSlider from "../SharedComponents/PitchSlider"
import AudioControls from "../SharedComponents/AudioControls"
import Canvas from '../App/components/Canvas'
import Button from "@mui/material/Button"
import {useTitle} from '../State/TitleContext'
import BinauralBeatState from "../Types/BinauralBeatTypes";
import ExtrasForm from "../SharedComponents/ExtrasForm";
import FrequencyRangeHelper from "../Helpers/FrequencyRangeHelper";
import {useFlashMessage} from "../State/FlashMessageContext";
import FlashMessage, {FlashEnum} from "../Models/FlashMessage";
import {useWhiteNoiseCtx} from "../State/UseWhiteNoiseContext";
import {useAudioWorkletCtx} from "../State/UseAudioWorkletContext";
import {Location} from 'history'
import CanvasColorHelper from "../Helpers/CanvasColorHellper";
import {BEAT_CANVAS_ID, CARRIER_CANVAS_ID} from "../Models/Constants";

interface PresetShowScreenProps {
    location: Location
}

function BinauralBeatEditScreen(props: PresetShowScreenProps):JSX.Element {
    // Global hooks
    const {setTitle} = useTitle()
    const {gradient, setGradient} = useGradient()
    const {setFlashMessage} = useFlashMessage()
    const {useWhiteNoise} = useWhiteNoiseCtx()
    const {useAudioWorklet} = useAudioWorkletCtx()
    //
    // Router
    const history = useHistory()
    const {preset_id} = useParams()
    //
    // Styles
    const classes = useStyles(gradient.toProps())
    // Beat state
    const [nameError, setNameError] = useState(null)
    const [name, setName] = useState('Name')
    const [playing, setPlaying] = useState(false)
    const [beatOscillator, setBeatOscillator] = useState(0)
    const [carrierOscillator, setCarrierOscillator] = useState(0)
    const [volume, setVolume] = useState(0)
    const [noiseLevel, setNoiseLevel] = useState(0)
    const [ changingState, setChangingState ] = useState(false)
    //
    // Render edit screen or create screen?
    const isNewBeat = props.location.pathname === '/create'
    //
    // For material ui audio controls
    function disabledButton(): 'play'| 'pause' | 'both' | 'none' {
        let state
        if(changingState) {
            state = 'both'
        } else if (playing) {
            state = 'play'
        } else {
            state = 'pause'
        }
        return state
    }

    function saveBeat(): void {
        (async () => {
            const id = BinauralBeat.ins().id
            const beatBody = BinauralBeat.ins().toState()
            const url = Routes.BinauralBeatUpdate(id.toString())
            const b = await NetworkService.getInstance().put(url, beatBody)
            // @ts-ignore https://stackoverflow.com/questions/40097820/property-does-not-exist-on-type-object-observable-subscribe
            const {name} = b.data.binauralBeatState.data.attributes

            const displayName = name || 'Binaural beat'
            setFlashMessage(new FlashMessage(`${displayName} is now saved.`, true, FlashEnum.success))
        })()
    }

    function createBeat(): void {
        (async () => {
            const beatBody = BinauralBeat.ins().toState()
            const b = await NetworkService
                .getInstance()
                .post(Routes
                    .BinauralBeatCreate, beatBody)

            if (b) {
                if (playing) pause()
                // @ts-ignore
                const binauralBeatState: BinauralBeatState = b.data
                    .binauralBeatState
                    .data
                    .attributes
                const {id} = binauralBeatState
                BinauralBeat.ins(binauralBeatState)
                const params: BinauralBeatState = BinauralBeat.ins().toState()
                history.push({pathname: Routes.BinauralBeatEditScreen(String(id)), binauralBeatState: params})
                const {name} = params
                const displayName = name || 'beat'
                setFlashMessage(
                    new FlashMessage(
                        `${displayName} was successfully created`,
                        true,
                        FlashEnum.success)
                )
            }
        })()

    }

    function onVolumeChange(newVolume: number): void {
        setVolume(newVolume)
        BinauralBeat.ins().volume = newVolume
        if(BinauralBeat.ins().playing) {
            BinauralBeat.ins().gain.gain.setValueAtTime(newVolume, 0)
        }
    }

    function beat() {
        return BinauralBeat.ins()
    }

    function onNameChange(event: any): void {
        event.preventDefault()
        const el = event.target
        const v = el.value
        const md = v.match(/[^a-zA-Z0-9\s]/)
        if (md) {
            const ms = md[0]
            el.value.replace(ms, '')
            return setNameError('Please use letters and numbers only')
        }
        setNameError(null)
        setName(v)
        BinauralBeat.ins().name = v
        setTitle(BinauralBeat.ins().generateTitle())
    }

    function pause(): void {
        BinauralBeat.ins().setPlayingState(false, useWhiteNoise, useAudioWorklet)
        setPlaying(false)
        delayButtonDisable()
    }

    function play(): void {
        BinauralBeat.ins().setPlayingState(true, useWhiteNoise, useAudioWorklet)
        setPlaying(true)
        delayButtonDisable()
    }

    function delayButtonDisable(): void {
        setChangingState(true)
        setTimeout(function () {
                setChangingState(false)
            }, BinauralBeat.RAMPTIME * 1000
        )
    }

    function onNoiseLevelChange(value: number): void {
        console.log(`Noise level: ${value}`)
        if (playing) {
            BinauralBeat.ins().noiseSource.volume.rampTo(value, 0.1)
        }
        BinauralBeat.ins().noiseLevel = value
        setNoiseLevel(value)
    }

    function updateUIFreqInfo(offset: number): void {
        let singletonValue = BinauralBeat.ins()
            .carrierOscillator
            .offset
        if (singletonValue != offset) {
            throw `Error! offset from updateUIFreqInfo is ${offset} and BinauralBeatSingleton.carrierOscillator has ${singletonValue}`
        }
        setTitle(BinauralBeat.ins().generateTitle())
    }

    function onBeatFreqChange(frequency: number): void {
        BinauralBeat.ins().beatOscillator.setFrequencyToPlay(frequency)
    }

    function onCarrierFreqChange(offset: number): void {
        BinauralBeat.ins().carrierOscillator.setOffsetToPlay(offset)


        updateUIFreqInfo(offset)
        BinauralBeat.ins().description = FrequencyRangeHelper
            .rangeString(offset)
    }

    function hydrateBeatState(beat: BinauralBeatState): void {
        const beatInstance = BinauralBeat.ins(beat)

        setTitle(
            beatInstance.generateTitle()
        )

        setGradient(
            FrequencyRangeHelper.generateGradient(
                beatInstance.carrierOscillator.offset
            )
        )
        setName(beatInstance.name)
        setPlaying(false)
        setBeatOscillator(beatInstance.beatOscillator.frequency)
        setCarrierOscillator(beatInstance.carrierOscillator.offset)

        // Set form inputs and models to the same value
        // TODO this MAY be getting called more than once (had some issue with it in rubymine)
        onVolumeChange(beatInstance.volume)
        onNoiseLevelChange(beatInstance.noiseLevel)
    }

    // On EDIT title
    useEffect(function() {
        //
        // TODO: clean this
        if (isNewBeat) {
            return
        }

        const localBeatState: BinauralBeatState = props.location.binauralBeatState
        if (localBeatState) {
            hydrateBeatState(localBeatState)
            if (props.location.playBeat) {
                play()
            }
        } else {
            (async () => {
                NetworkService
                    .getInstance()
                    .get(Routes.BinauralBeatShow(preset_id))
                    .then((b: any) => {
                        const beatState =
                            b
                                .data
                                .binauralBeatState
                                .data
                                .attributes
                        hydrateBeatState(beatState)
                    })
            })()
        }
        return pause
    }, [])

    // On NEW title
    useEffect(function() {
        if (!isNewBeat) return

        // Before we populate the singleton
        // We need to pause previous sound
        // Otherwise the oscillators will be
        // Orphaned but left setPlayingState.
        // Tell instance to pause before we
        // Hydrate:
        if (BinauralBeat.inMemory) {
            BinauralBeat.ins().setPlayingState(false, useWhiteNoise, useAudioWorklet)
        }

        hydrateBeatState({
            name: 'Custom Beat',
            id: 0,
            beatOscillator: 432,
            carrierOscillator: 4,
            volume: 1,
            editable: true,
            noiseLevel: 1,
            description: 'theta',
        })

        BinauralBeat.ins().setPlayingState(
            false,
            useWhiteNoise,
            useAudioWorklet
        )

        return pause
    }, [])

    const handleCarrierBlur = (offset: number) => {
        setGradient(
            FrequencyRangeHelper.generateGradient(offset)
        )
        const pair = CanvasColorHelper.generateColorPair(offset)
        // TODO if visual enabled!
        CanvasColorHelper.setCanvasColorForBeats(pair.beatColor, pair.carrierColor)
    }

    return (
        <Paper className={classes.presetFormCard} elevation={1}>
            <div className={classes.pitchSliderContainer}>
                <PitchSlider
                    showTextInput
                    minMax={BinauralBeat.beatMinMax}
                    label={'Main tone'}
                    default={beatOscillator}
                    handleSliderChangeCallback={onBeatFreqChange}
                />
                <PitchSlider
                    showTextInput
                    minMax={BinauralBeat.carrierMinMax}
                    label={'Carrier tone'}
                    default={carrierOscillator}
                    handleSliderChangeCallback={onCarrierFreqChange}
                    handleBlur={handleCarrierBlur}
                />
            </div>
            <div className={classes.canvasContainer}>
                <Canvas id={CARRIER_CANVAS_ID} />
                <Canvas id={BEAT_CANVAS_ID} />
            </div>
            <div className={classes.audioControlsContainer}>
                <AudioControls
                    handlePlayPress={play}
                    handlePausePress={pause}
                    disabledButton={disabledButton()}/>
                <div className={classes.saveButtonContainer}>
                    <Button variant="contained"
                            onClick={isNewBeat ? createBeat : saveBeat}
                            className={classes.saveButton}>
                        Save
                    </Button>
                </div>
            </div>
            <ExtrasForm
                error={nameError}
                onNameChange={onNameChange}
                name={isNewBeat ? null : name}
                gradient={gradient}
                volume={volume}
                noiseLevel={noiseLevel}
                onVolumeChange={onVolumeChange}
                onNoiseLevelChange={onNoiseLevelChange}
            />
        </Paper>
    )
}
// @ts-ignore
export default BinauralBeatEditScreen
