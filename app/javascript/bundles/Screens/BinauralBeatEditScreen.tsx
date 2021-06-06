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
import {BinauralBeatState, useBinauralBeat} from "../State/BinauralBeatContext";
import ExtrasForm from "../SharedComponents/ExtrasForm";
import FrequencyRangeHelper from "../Helpers/FrequencyRangeHelper";
import ProgressWheel from "../SharedComponents/ProgressWheel";
import { useHistory } from 'react-router-dom'
import {getDestination} from "tone";

interface PresetShowScreenProps {
    location: any
}

const BinauralBeatEditScreen:FunctionComponent<PresetShowScreenProps> = (props) => {

    const {setTitle} = useTitle()
    const {gradient, setGradient} = useGradient()
    const {binauralBeatState, setBinauralBeatState} = useBinauralBeat()
    const [error, setError] = useState(null)
    const {preset_id} = useParams()
    const classes = useStyles(gradient.toProps())
    const history = useHistory()

    const isCreate = props.location.pathname === '/create'

    function computeAudioControlsState() {
        if (binauralBeatState.playing) {
            return 'play'
        } else {
            return 'pause'
        }
    }

    function saveBeat() {
        const id = BinauralBeat.getInstance().id
        const beatBody = BinauralBeat.getInstance().toState()

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
        const id = BinauralBeat.getInstance().id
        const beatBody = BinauralBeat.getInstance().toState()

        NetworkService
            .getInstance()
            .post(Routes
                .BinauralBeatCreate(
                    id.toString()), beatBody)
            .then(function (json) {
                debugger
                history.replace(`/presets/${id}`,
                    BinauralBeat.getInstance().
                    toState())

            })

    }

   function onVolumeChange(value: number){
        getDestination().volume.value = value
        BinauralBeat.getInstance().volume = value
        setBinauralBeatState(BinauralBeat.getInstance().toState())
    }

    function onNameChange(event: any) {
        const el = event.target
        const v = el.value
        const md = v.match(/[^a-zA-Z0-9\s]/)
        if (md) {
            const ms = md[0]
            el.value.replace(ms, '')
            return setError('Please use letters and numbers only')
        }
        setError(null)

        BinauralBeat.getInstance().name = v
        setTitle(BinauralBeat.getInstance().generateTitle())
        setBinauralBeatState(BinauralBeat.getInstance().toState())
    }

    function pause() {
        BinauralBeat.getInstance().playing = false
        setBinauralBeatState(BinauralBeat.getInstance().toState())
    }

    function play() {
        this.playing = true
        setBinauralBeatState(BinauralBeat.getInstance().toState())
    }

    function onNoiseLevelChange(value: number) {
        console.log(`Noise level: ${value}`)
        this.noiseSource.toneNoise.volume.value = value
        this.setBinauralBeatState(this.toState())
    }

    function onPitchSliderBlur(offset: number) {
        setBinauralBeatState(BinauralBeat.getInstance().toState())
        setTitle(BinauralBeat.getInstance().generateTitle())
        setGradient(
            FrequencyRangeHelper
                .generateGradient(
                    BinauralBeat.getInstance()
                        .carrierOscillator
                        .offset
                )
        )
    }

    function onBeatFreqChange(frequency: Number) {
        BinauralBeat
            .getInstance()
            .beatOscillator
            .setFrequency(BinauralBeat
                .getInstance()
                .carrierOscillator,
                Number(frequency))
    }

    function onCarrierFreqChange(offset: Number) {
        BinauralBeat
            .getInstance()
            .carrierOscillator
            .offset = Number(offset)
        BinauralBeat
            .getInstance()
            .beatOscillator
            .setFrequency(
                BinauralBeat.getInstance().carrierOscillator, null)
        console.log(BinauralBeat.getInstance().beatOscillator.toneOscillator.frequency.value);
    }

    if (!isCreate) {
        useEffect(() => {
            const localBeatState = props.location.binauralBeatState
            if (localBeatState) {
                const binauralBeat = BinauralBeat.getInstance(localBeatState)
                setTitle(BinauralBeat.getInstance().generateTitle())
                setGradient(FrequencyRangeHelper.generateGradient(localBeatState.carrierOscillator))
                setBinauralBeatState(localBeatState)
            } else {
                NetworkService
                    .getInstance()
                    .get(Routes.BinauralBeatShow(preset_id))
                    .then(function (json) {
                        const beat: BinauralBeatState = json
                            .binauralBeatState
                            .data
                            .attributes
                        const instance = BinauralBeat.getInstance(beat)
                        setBinauralBeatState(instance.toState())
                        setTitle(instance.generateTitle())
                        setGradient(FrequencyRangeHelper.generateGradient(beat.carrierOscillator))
                    })
            }
        }, [])
    }

    if (binauralBeatState) {
        return (
            <Paper className={classes.presetFormCard} elevation={0}>
                <div className={classes.pitchSliderContainer}>
                    <PitchSlider
                        handleSliderBlurCallback={onPitchSliderBlur}
                        showTextInput
                        minMax={BinauralBeat.beatMinMax}
                        label={'Main tone'}
                        default={binauralBeatState.beatOscillator}
                        handleSliderChangeCallback={onBeatFreqChange}
                    />
                    <PitchSlider
                        handleSliderBlurCallback={onPitchSliderBlur}
                        showTextInput
                        minMax={BinauralBeat.carrierMinMax}
                        label={'Carrier tone'}
                        default={binauralBeatState.carrierOscillator}
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
                    name={isCreate ? binauralBeatState.name : null}
                    gradient={gradient}
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