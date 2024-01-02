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

interface PresetShowScreenProps {
    location: any
}

const BinauralBeatEditScreen: FunctionComponent<PresetShowScreenProps> = (props) => {
    const {setTitle} = useTitle()
    const {gradient, setGradient} = useGradient()
    const {binauralBeatState, setBinauralBeatState} = useBinauralBeat()
    const [error, setError] = useState(null)
    const {preset_id} = useParams()
    const classes = useStyles(gradient.toProps())
    const history = useHistory()

    const isCreate = props.location.pathname === '/create'

    const computeAudioControlsState = () => {
        if (binauralBeatState.playing) {
            return 'play'
        } else {
            return 'pause'
        }
    }

    const onNameChange = (event) => {
        const el = event.target
        const v = el.value
        const md = v.match(/[^a-zA-Z0-9\s]/)
        if (md) {
            const ms = md[0]
            el.value.replace(ms, '')
            return setError('Please use letters and numbers only')
        }
        setError(null)
        BinauralBeat.getInstance().onNameChange(v)
    }


    const saveBeat = () => {
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

    const createBeat = () => {
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
                        handleSliderBlurCallback={BinauralBeat.getInstance().onPitchSliderBlur}
                        showTextInput
                        minMax={BinauralBeat.beatMinMax}
                        label={'Main tone'}
                        default={binauralBeatState.beatOscillator}
                        handleSliderChangeCallback={BinauralBeat.getInstance().onBeatFreqChange}
                    />
                    <PitchSlider
                        handleSliderBlurCallback={BinauralBeat.getInstance().onPitchSliderBlur}
                        showTextInput
                        minMax={BinauralBeat.carrierMinMax}
                        label={'Carrier tone'}
                        default={binauralBeatState.carrierOscillator}
                        handleSliderChangeCallback={BinauralBeat.getInstance().onCarrierFreqChange}
                    />
                </div>
                <div className={classes.audioControlsContainer}>
                    <AudioControls
                        handlePlayPress={BinauralBeat.getInstance().play}
                        handlePausePress={BinauralBeat.getInstance().pause}
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