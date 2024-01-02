import * as React from 'react'
import {FormEvent, FunctionComponent, useEffect, useState} from 'react'
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
import {useBinauralBeat} from "../State/BinauralBeatContext";
import ExtrasForm from "../SharedComponents/ExtrasForm";
import FrequencyRangeHelper from "../Helpers/FrequencyRangeHelper";
import ProgressWheel from "../SharedComponents/ProgressWheel";
import useShared from "../Styles/Shared";

interface PresetShowScreenProps {
    location: any
}

const BinauralBeatCreateScreen: FunctionComponent<PresetShowScreenProps> = (props) => {
    const {gradient, setGradient} = useGradient()
    const {binauralBeatState, setBinauralBeatState} = useBinauralBeat()
    const [error, setError] = useState(null)
    const classes = useStyles(gradient.toProps())

    const computeAudioControlsState = () => {
        if (binauralBeatState.playing) {
            return 'play'
        } else {
            return 'pause'
        }
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
                alert(json)
            })

    }

    const onNameChange = (event) => {
        const el = event.target
        const v= el.value
        const md = v.match(/[^a-zA-Z0-9\s]/)
        if(md) {
            const ms = md[0]
            el.value.replace(ms, '')
            return setError('Please use letters and numbers only')
        }
        setError(null)
        BinauralBeat.getInstance().onNameChange(v)
    }

    if (binauralBeatState) {
        const binauralBeat = BinauralBeat.getInstance(binauralBeatState)
        return (
            <Paper className={classes.presetFormCard} elevation={0}>
                <div className={classes.headerContainer}>
                    {/*<span className={classes.presetHeader}>{binauralBeatState.name}</span>*/}
                    {/*<span*/}
                    {/*    className={classes.presetSubtext}> ({FrequencyRangeHelper.rangeString(binauralBeatState.carrierOscillator)})</span>*/}

                </div>
                <div className={classes.pitchSliderContainer}>
                    <PitchSlider
                        handleSliderBlurCallback={binauralBeat.onPitchSliderBlur}
                        showTextInput
                        minMax={BinauralBeat.beatMinMax}
                        label={'Main tone'}
                        default={binauralBeat.beatOscillator.frequency}
                        handleSliderChangeCallback={binauralBeat.onBeatFreqChange}
                    />
                    <PitchSlider
                        handleSliderBlurCallback={binauralBeat.onPitchSliderBlur}
                        showTextInput
                        minMax={BinauralBeat.carrierMinMax}
                        label={'Secondary tone'}
                        default={binauralBeat.carrierOscillator.offset}
                        handleSliderChangeCallback={binauralBeat.onCarrierFreqChange}
                    />
                </div>
                <div className={classes.audioControlsContainer}>
                    <AudioControls
                        handlePlayPress={binauralBeat.play}
                        handlePausePress={binauralBeat.pause}
                        disabled={computeAudioControlsState()}/>
                    <div className={classes.saveButtonContainer}>
                        <Button variant="contained" onClick={createBeat} className={classes.saveButton}>
                            Save changes
                        </Button>
                    </div>
                </div>
                <ExtrasForm
                    error={error}
                    gradient={gradient}
                    onNameChange={onNameChange}
                    binauralBeat={binauralBeat}/>
            </Paper>
        )
    } else {
        return (
            <ProgressWheel/>
        )
    }
}
// @ts-ignore
export default BinauralBeatCreateScreen