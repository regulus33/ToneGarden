import * as React from 'react'
import {FunctionComponent, useEffect, useState} from 'react'
import NetworkService from "../Network/NetworkService"
import Routes from "../Network/Routes"
import {useHistory, useParams} from 'react-router-dom'
import BinauralBeatSingleton from '../Models/BinauralBeatSingleton'
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
import {useError} from "../State/ErrorContext";

interface PresetShowScreenProps {
    location: any
}

const BinauralBeatEditScreen: FunctionComponent<PresetShowScreenProps> = (props) => {
    // Global hooks
    const {setTitle} = useTitle()
    const {gradient, setGradient} = useGradient()
    const {setFlashMessage} = useFlashMessage()
    const { error } = useError()

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
    // Hook called when a succesful fetch of a beat was completed

    const isNewBeat = props.location.pathname === '/create'

    // For material ui audio controls
    function computeAudioControlsState() {
        if (playing) {
            return 'play'
        } else {
            return 'pause'
        }
    }

    function saveBeat() {
        (async () => {
            const id = BinauralBeatSingleton.ins().id
            const beatBody = BinauralBeatSingleton.ins().toState()
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
            const beatBody = BinauralBeatSingleton.ins().toState()
            const b = await NetworkService
                .getInstance()
                .post(Routes
                    .BinauralBeatCreate, beatBody)

            if(b) {

                // @ts-ignore
                const binauralBeatState: BinauralBeatState = b.data
                    .binauralBeatState
                    .data
                    .attributes

                const {id} = binauralBeatState
                BinauralBeatSingleton.ins(binauralBeatState)
                const params: BinauralBeatState = BinauralBeatSingleton.ins().toState()
                history.push({pathname: Routes.BinauralBeatEditScreen(String(id)), binauralBeatState: params})
                const {name} = params
                const displayName = name || 'beat'
                setFlashMessage(
                    new FlashMessage(
                        `${displayName} was successfully created`,
                        true,
                        FlashEnum.success)
                )
                if (playing) {
                    pause()
                }
            }
        })()

    }

    function onVolumeChange(value: number) {
        getDestination().volume.rampTo(value)
        BinauralBeatSingleton.ins().volume = value
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
        BinauralBeatSingleton.ins().name = v
        setTitle(BinauralBeatSingleton.ins().generateTitle())
    }

    function pause() {
        BinauralBeatSingleton.ins().playing = false
        setPlaying(false)
    }

    function play() {
        BinauralBeatSingleton.ins().playing = true
        setPlaying(true)
    }

    // NOISE
    // function onNoiseLevelChange(value: number) {
    //     console.log(`Noise level: ${value}`)
    //     BinauralBeatSingleton.ins().noiseSource.toneNoise.volume.value = value
    //     setNoiseLevel(value)
    // }

    function updateUIFreqInfo(offset: number) {
        let singletonValue = BinauralBeatSingleton.ins()
            .carrierOscillator
            .offset
        if (singletonValue != offset) {
            throw `Error! offset from updateUIFreqInfo is ${offset} and BinauralBeatSingleton.carrierOscillator has ${singletonValue}`
        }
        setTitle(BinauralBeatSingleton.ins().generateTitle())
        setGradient(
            FrequencyRangeHelper.generateGradient(offset)
        )
    }

    function onBeatFreqChange(frequency: number) {
        BinauralBeatSingleton
            .ins()
            .beatOscillator
            .setFrequency(BinauralBeatSingleton
                    .ins()
                    .carrierOscillator,
                Number(frequency))
    }

    function onCarrierFreqChange(offset: number) {
        BinauralBeatSingleton
            .ins()
            .carrierOscillator
            .offset = Number(offset)
        BinauralBeatSingleton
            .ins()
            .beatOscillator
            .setFrequency(
                BinauralBeatSingleton.ins().carrierOscillator, null)
        updateUIFreqInfo(offset)
        BinauralBeatSingleton.ins().description = FrequencyRangeHelper
            .rangeString(offset)
    }

    function hydrateBeatState(beat: BinauralBeatState) {
        const beatInstance = BinauralBeatSingleton.ins(beat)

        setTitle(
            beatInstance.generateTitle()
        )

        setGradient(
            FrequencyRangeHelper.generateGradient(
                beatInstance.carrierOscillator.offset
            )
        )

        setName(beatInstance.name)
        setPlaying(beatInstance.playing)
        setBeatOscillator(beatInstance.beatOscillator.frequency)
        setCarrierOscillator(beatInstance.carrierOscillator.offset)
        setVolume(beatInstance.volume)
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

        if (BinauralBeatSingleton.inMemory) {
            BinauralBeatSingleton.ins().playing = false
        }

        hydrateBeatState({
            name: '',
            id: 0,
            beatOscillator: 432,
            carrierOscillator: 4,
            volume: 0,
            editable: true,
            noiseLevel: 0,
            description: 'alpha'
        })

        BinauralBeatSingleton.ins().playing = false

        return pause
    }, [])


    return (
        <Paper className={classes.presetFormCard} elevation={0}>
            <div className={classes.pitchSliderContainer}>
                <PitchSlider
                    showTextInput
                    minMax={BinauralBeatSingleton.beatMinMax}
                    label={'Main tone'}
                    default={beatOscillator}
                    handleSliderChangeCallback={onBeatFreqChange}
                />
                <PitchSlider
                    showTextInput
                    minMax={BinauralBeatSingleton.carrierMinMax}
                    label={'Carrier tone'}
                    default={carrierOscillator}
                    handleSliderChangeCallback={onCarrierFreqChange}
                />
            </div>
            <div className={classes.audioControlsContainer}>
                <AudioControls
                    handlePlayPress={play}
                    handlePausePress={pause}
                    disabled={computeAudioControlsState()}/>
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
                onVolumeChange={onVolumeChange}
            />
        </Paper>

    )
}
// @ts-ignore
export default BinauralBeatEditScreen