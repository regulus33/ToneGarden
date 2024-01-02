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
import BinauralBeatState, {BinauralBeatJson} from "../Types/BinauralBeatTypes";
import ExtrasForm from "../SharedComponents/ExtrasForm";
import FrequencyRangeHelper from "../Helpers/FrequencyRangeHelper";
import {getDestination} from "tone";
import {useFlashMessage} from "../State/FlashMessageContext";
import FlashMessage, {FlashEnum} from "../Models/FlashMessage";

interface PresetShowScreenProps {
    location: any
}

const BinauralBeatEditScreen: FunctionComponent<PresetShowScreenProps> = (props) => {
    // Global hooks
    const {setTitle} = useTitle()
    const {gradient, setGradient} = useGradient()
    const {flashMessage, setFlashMessage} = useFlashMessage()

    // Router
    const history = useHistory()
    const {preset_id} = useParams()

    // Styles
    const classes = useStyles(gradient.toProps())

    // Beat state
    const [error, setError] = useState(null)
    const [name, setName] = useState('Name')
    const [playing, setPlaying] = useState(false)
    const [beatOscillator, setBeatOscillator] = useState(0)
    const [carrierOscillator, setCarrierOscillator] = useState(0)
    const [volume, setVolume] = useState(0)
    const [noiseLevel, setNoiseLevel] = useState(0)
    const [editable, setEditable] = useState(false)
    // Hook called when a succesful fetch of a beat was completed
    const [beatObtained, setBeatObtained] = useState(false)

    const isNewBeat = props.location.pathname === '/create'

    // For material ui audio controls
    function computeAudioControlsState() {
        if (playing) {
            return 'play'
        } else {
            return 'pause'
        }
    }

    // TODO handle errors
    // TODO add toast
    function saveBeat() {
        const id = BinauralBeatSingleton.ins().id
        const beatBody = BinauralBeatSingleton.ins().toState()

        NetworkService
            .getInstance()
            .put(Routes
                .BinauralBeatUpdate(
                    id.toString()), beatBody)
            .then(function (b: BinauralBeatJson) {
                const {name} = b.binauralBeatState.data.attributes
                const displayName = name || 'Binaural beat'
                setFlashMessage(new FlashMessage(`${displayName} is now saved.`, true, FlashEnum.success))
            })
    }

    // TODO handle errors
    // TODO add toast
    function createBeat() {
        const beatBody = BinauralBeatSingleton.ins().toState()

        NetworkService
            .getInstance()
            .post(Routes
                .BinauralBeatCreate, beatBody)
            .then(function (b: BinauralBeatJson) {
                if (b) {
                    const binauralBeatState: BinauralBeatState = b
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
                }
            })

    }

    function onVolumeChange(value: number) {
        getDestination().volume.value = value
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
            return setError('Please use letters and numbers only')
        }
        setError(null)
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

    function onPitchSliderBlur(offset: number) {
        setTitle(BinauralBeatSingleton.ins().generateTitle())
        setGradient(
            FrequencyRangeHelper
                .generateGradient(
                    BinauralBeatSingleton.ins()
                        .carrierOscillator
                        .offset
                )
        )
    }

    function onBeatFreqChange(frequency: Number) {
        BinauralBeatSingleton
            .ins()
            .beatOscillator
            .setFrequency(BinauralBeatSingleton
                    .ins()
                    .carrierOscillator,
                Number(frequency))
    }

    function onCarrierFreqChange(offset: Number) {
        BinauralBeatSingleton
            .ins()
            .carrierOscillator
            .offset = Number(offset)
        BinauralBeatSingleton
            .ins()
            .beatOscillator
            .setFrequency(
                BinauralBeatSingleton.ins().carrierOscillator, null)
        console.log(BinauralBeatSingleton.ins().beatOscillator.toneOscillator.frequency.value);
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
        // setNoiseLevel(beat.noiseLevel)
        setEditable(beatInstance.editable)
        setBeatObtained(true)
    }

    useEffect(() => {
        if (isNewBeat) {
            return
        }
        const localBeatState: BinauralBeatState = props.location.binauralBeatState
        if (localBeatState) {
            hydrateBeatState(localBeatState)
        } else {
            NetworkService
                .getInstance()
                .get(Routes.BinauralBeatShow(preset_id))
                .then(function (b: BinauralBeatJson) {
                    const beatState = b
                        .binauralBeatState
                        .data
                        .attributes
                    hydrateBeatState(beatState)
                })
        }
    }, [])

    useEffect(() => {
        if (!isNewBeat) {
            return
        }

        hydrateBeatState({
            name: '',
            id: 0,
            beatOscillator: 432,
            carrierOscillator: 4,
            volume: 0,
            editable: true,
            noiseLevel: 0,
        })
    }, [])


    return (
        <Paper className={classes.presetFormCard} elevation={0}>
            <div className={classes.pitchSliderContainer}>
                <PitchSlider
                    handleSliderBlurCallback={onPitchSliderBlur}
                    showTextInput
                    minMax={BinauralBeatSingleton.beatMinMax}
                    label={'Main tone'}
                    default={beatOscillator}
                    handleSliderChangeCallback={onBeatFreqChange}
                />
                <PitchSlider
                    handleSliderBlurCallback={onPitchSliderBlur}
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
                error={error}
                onNameChange={onNameChange}
                name={isNewBeat ? null : name}
                gradient={gradient}
                onVolumeChange={onVolumeChange}
            />
        </Paper>

    )
}
// @ts-ignore
export default BinauralBeatEditScreen