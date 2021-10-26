import * as React from 'react'
import {FunctionComponent, useEffect, useState} from 'react'
import NetworkService from "../Network/NetworkService"
import Routes from "../Network/Routes"
import {useHistory, useParams} from 'react-router-dom'
import BinauralBeat from '../Models/BinauralBeat'
import useStyles from '../Styles/StylesPresetShowScreen'
import {useGradient} from "../State/GradientContext"
import Paper from '@material-ui/core/Paper'
import PitchSlider from "../SharedComponents/PitchSlider"
import AudioControls from "../SharedComponents/AudioControls"
import Button from "@material-ui/core/Button"
import {useTitle} from '../State/TitleContext'
import BinauralBeatState from "../Types/BinauralBeatTypes";
import ExtrasForm from "../SharedComponents/ExtrasForm";
import FrequencyRangeHelper from "../Helpers/FrequencyRangeHelper";
import {getDestination} from "tone";
import {useFlashMessage} from "../State/FlashMessageContext";
import FlashMessage, {FlashEnum} from "../Models/FlashMessage";
import {useWhiteNoiseCtx} from "../State/UseWhiteNoiseContext";
import {useAudioWorkletCtx} from "../State/UseAudioWorkletContext";

interface PresetShowScreenProps {
    location: any
}

const BinauralBeatEditScreen: FunctionComponent<PresetShowScreenProps> = (props) => {
    // Global hooks
    const {setTitle} = useTitle()
    const {gradient, setGradient} = useGradient()
    const {setFlashMessage} = useFlashMessage()
    const {useWhiteNoise} = useWhiteNoiseCtx()
    const {useAudioWorklet} = useAudioWorkletCtx()

    // Router
    const history = useHistory()
    const {preset_id} = useParams()

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

    // Hook called when a succesful fetch of a beat was completed

    const isNewBeat = props.location.pathname === '/create'

    // For material ui audio controls
    function disabledButton() {
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

    function saveBeat() {
        (async () => {
            const id = BinauralBeat.ins().id
            const beatBody = BinauralBeat.ins().toState()
            const b = await NetworkService
                .getInstance()
                .put(Routes
                    .BinauralBeatUpdate(
                        id.toString()), beatBody)

            // @ts-ignore https://stackoverflow.com/questions/40097820/property-does-not-exist-on-type-object-observable-subscribe
            const {name} = b.data.binauralBeatState.data.attributes

            const displayName = name || 'Binaural beat'
            setFlashMessage(new FlashMessage(`${displayName} is now saved.`, true, FlashEnum.success))

        })()
    }

    function createBeat() {
        (async () => {
            const beatBody = BinauralBeat.ins().toState()
            const b = await NetworkService
                .getInstance()
                .post(Routes
                    .BinauralBeatCreate, beatBody)

            if (b) {
                if (playing) {
                    pause()
                }
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

    function onVolumeChange(value: number) {
        getDestination().volume.rampTo(value)
        BinauralBeat.ins().volume = value
        setVolume(value)
    }

    function onNameChange(event: any) {
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

    function pause() {
        BinauralBeat.ins().playing(false, useWhiteNoise, useAudioWorklet)
        setPlaying(false)
        delayButtonDisable()
    }

    function play() {
        BinauralBeat.ins().playing(true, useWhiteNoise, useAudioWorklet)
        setPlaying(true)
        delayButtonDisable()
    }

    function delayButtonDisable() {
        setChangingState(true)
        setTimeout(function () {
                setChangingState(false)
            }, BinauralBeat.RAMPTIME * 1000
        )
    }

    function onNoiseLevelChange(value: number) {
        console.log(`Noise level: ${value}`)
        if (playing) {
            BinauralBeat.ins().noiseSource.volume.rampTo(value, 0.1)
        }
        BinauralBeat.ins().noiseLevel = value
        setNoiseLevel(value)
    }

    function updateUIFreqInfo(offset: number) {
        let singletonValue = BinauralBeat.ins()
            .carrierOscillator
            .offset
        if (singletonValue != offset) {
            throw `Error! offset from updateUIFreqInfo is ${offset} and BinauralBeatSingleton.carrierOscillator has ${singletonValue}`
        }
        setTitle(BinauralBeat.ins().generateTitle())
    }

    function onBeatFreqChange(frequency: number) {
        BinauralBeat.ins().beatOscillator.setFrequency(
                    BinauralBeat.ins().carrierOscillator,
                    Number(frequency)
            )
    }

    function onCarrierFreqChange(offset: number) {
        BinauralBeat.ins().carrierOscillator.offset = Number(
            offset
        )
        BinauralBeat.ins().beatOscillator.setFrequency(
            BinauralBeat.ins().carrierOscillator, null
        )
        updateUIFreqInfo(offset)
        BinauralBeat.ins().description = FrequencyRangeHelper
            .rangeString(offset)
    }

    function hydrateBeatState(beat: BinauralBeatState) {
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

        // setVolume(beatInstance.volume)
        // setNoiseLevel(beatInstance.noiseLevel)
        // This is required instead of a simple set state
        // setVolume(beatInstance.volume)
        onVolumeChange(beatInstance.volume)
        onNoiseLevelChange(beatInstance.noiseLevel)

    }

    // On EDIT title
    useEffect(() => {
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
    useEffect(() => {
        if (!isNewBeat) {
            return
        }

        // Before we populate the singleton
        // We need to pause previous sound
        // Otherwise the oscillators will be
        // Orphaned but left playing.
        // Tell instance to pause before we
        // Hydrate:
        if (BinauralBeat.inMemory) {
            BinauralBeat.ins().playing(false, useWhiteNoise, useAudioWorklet)
        }

        hydrateBeatState({
            name: 'Custom Beat',
            id: 0,
            beatOscillator: 432,
            carrierOscillator: 4,
            volume: 0,
            editable: true,
            noiseLevel: 0,
            description: 'theta',
        })

        BinauralBeat.ins().playing(
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
    }

    return (
        <Paper className={classes.presetFormCard} elevation={0}>
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