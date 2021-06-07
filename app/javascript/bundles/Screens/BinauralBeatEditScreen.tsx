import * as React from 'react'
import {FunctionComponent, useEffect, useState} from 'react'
import NetworkService from "../Network/NetworkService"
import Routes from "../Network/Routes"
import {useParams} from 'react-router-dom'
import BinauralBeat from '../Models/BinauralBeat'
import useStyles from '../Styles/StylesPresetShowScreen'
import {useGradient} from "../State/GradientContext"
import Paper from '@material-ui/core/Paper'
import PitchSlider from "../SharedComponents/PitchSlider"
import AudioControls from "../SharedComponents/AudioControls"
import Button from "@material-ui/core/Button"
import {useTitle} from '../State/TitleContext'
import BinauralBeatState from "../Types/BinauralBeatStateType";
import ExtrasForm from "../SharedComponents/ExtrasForm";
import FrequencyRangeHelper from "../Helpers/FrequencyRangeHelper";
import ProgressWheel from "../SharedComponents/ProgressWheel";
import {useHistory} from 'react-router-dom'
import {getDestination} from "tone";
import FastJson from "../Types/FastJsonType";

interface PresetShowScreenProps {
    location: any
}

const BinauralBeatEditScreen: FunctionComponent<PresetShowScreenProps> = (props) => {
    // Global hooks
    const {setTitle} = useTitle()
    const {gradient, setGradient} = useGradient()

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
    const [beatObtained, setBeatObtained] = useState(false)

    const isCreate = props.location.pathname === '/create'

    function computeAudioControlsState() {
        if (playing) {
            return 'play'
        } else {
            return 'pause'
        }
    }

    function saveBeat() {
        const id = BinauralBeat.ins().id
        const beatBody = BinauralBeat.ins().toState()

        NetworkService
            .getInstance()
            .put(Routes
                .BinauralBeatUpdate(
                    id.toString()), beatBody)
            .then(function (json) {
                alert(json)
            })
    }

    function createBeat() {
        const beatBody = BinauralBeat.ins().toState()

        NetworkService
            .getInstance()
            .post(Routes
                .BinauralBeatCreate, beatBody)
            .then(function (fastJson: FastJson) {
                if(fastJson) {
                    const { id } = fastJson.data
                    const binauralBeatState: BinauralBeatState = fastJson
                        .data
                        .attributes
                    BinauralBeat.ins(binauralBeatState)
                    const params: BinauralBeatState = BinauralBeat.ins().toState()
                    history.push({pathname: Routes.BinauralBeatEditScreen(id), binauralBeatState: params})
                }
            })

    }

    function onVolumeChange(value: number) {
        getDestination().volume.value = value
        BinauralBeat.ins().volume = value
        setVolume(value)
    }

    function onNameChange(event: any) {
        event.preventDefault()
        const el = event.target
        debugger
        const v = el.value
        const md = v.match(/[^a-zA-Z0-9\s]/)
        if (md) {
            const ms = md[0]
            el.value.replace(ms, '')
            return setError('Please use letters and numbers only')
        }
        setError(null)
        setName(v)
        BinauralBeat.ins().name = v
        setTitle(BinauralBeat.ins().generateTitle())
    }

    function pause() {
        BinauralBeat.ins().playing = false
        setPlaying(false)
    }

    function play() {
        BinauralBeat.ins().playing = true
        setPlaying(true)
    }

    function onNoiseLevelChange(value: number) {
        console.log(`Noise level: ${value}`)
        BinauralBeat.ins().noiseSource.toneNoise.volume.value = value
        setNoiseLevel(value)
    }

    function onPitchSliderBlur(offset: number) {
        setTitle(BinauralBeat.ins().generateTitle())
        setGradient(
            FrequencyRangeHelper
                .generateGradient(
                    BinauralBeat.ins()
                        .carrierOscillator
                        .offset
                )
        )
    }

    function onBeatFreqChange(frequency: Number) {
        BinauralBeat
            .ins()
            .beatOscillator
            .setFrequency(BinauralBeat
                    .ins()
                    .carrierOscillator,
                Number(frequency))
    }

    function onCarrierFreqChange(offset: Number) {
        BinauralBeat
            .ins()
            .carrierOscillator
            .offset = Number(offset)
        BinauralBeat
            .ins()
            .beatOscillator
            .setFrequency(
                BinauralBeat.ins().carrierOscillator, null)
        console.log(BinauralBeat.ins().beatOscillator.toneOscillator.frequency.value);
    }

    function hydrateBeatState(beat: BinauralBeatState) {
        BinauralBeat.ins(beat)

        setTitle(
            BinauralBeat
                .ins()
                .generateTitle()
        )

        setGradient(
            FrequencyRangeHelper.generateGradient(
                beat.carrierOscillator
            )
        )

        setName(beat.name)
        setPlaying(beat.playing)
        setBeatOscillator(beat.beatOscillator)
        setCarrierOscillator(beat.carrierOscillator)
        setVolume(beat.volume)
        setNoiseLevel(beat.noiseLevel)
        setEditable(beat.editable)
        setBeatObtained(true)
    }

    useEffect(() => {
        if (!isCreate) {
            const localBeatState: BinauralBeatState = props.location.binauralBeatState
            if (localBeatState) {
                hydrateBeatState(localBeatState)
            } else {
                NetworkService
                    .getInstance()
                    .get(Routes.BinauralBeatShow(preset_id))
                    .then(function (json) {
                        const fetchedBeatState: BinauralBeatState = json
                            .binauralBeatState

                        hydrateBeatState(fetchedBeatState)
                    })
            }
        } else {
            hydrateBeatState({
                name: '',
                id: 0,
                beatOscillator: 432,
                carrierOscillator: 4,
                playing: false,
                volume: 0,
                editable: true,
                noiseLevel: 0,
            })
        }

    }, [])

    if (beatObtained) {
        return (
            <Paper className={classes.presetFormCard} elevation={0}>
                <div className={classes.pitchSliderContainer}>
                    <PitchSlider
                        handleSliderBlurCallback={onPitchSliderBlur}
                        showTextInput
                        minMax={BinauralBeat.beatMinMax}
                        label={'Main tone'}
                        default={beatOscillator}
                        handleSliderChangeCallback={onBeatFreqChange}
                    />
                    <PitchSlider
                        handleSliderBlurCallback={onPitchSliderBlur}
                        showTextInput
                        minMax={BinauralBeat.carrierMinMax}
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
                        <Button variant="contained" onClick={isCreate ? createBeat : saveBeat}
                                className={classes.saveButton}>
                            Save
                        </Button>
                    </div>
                </div>
                <ExtrasForm
                    error={error}
                    onNameChange={onNameChange}
                    name={isCreate ? null : name}
                    gradient={gradient}
                    onVolumeChange={onVolumeChange}
                />
            </Paper>
        )
    } else {
        return (
            <ProgressWheel/>
        )
    }
}
// @ts-ignore
export default BinauralBeatEditScreen