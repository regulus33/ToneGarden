import * as React from 'react'
import {FunctionComponent, useEffect} from 'react'
import NetworkService from "../../Network/NetworkService"
import Routes from "../../Network/Routes"
import {useParams} from 'react-router-dom'
import BinauralBeat from '../../Models/BinauralBeat'
import useStyles from '../../Styles/StylesPresetShowScreen'
import {useGradient} from "../../State/GradientContext"
import Paper from '@material-ui/core/Paper'
import PitchSlider from "../../SharedComponents/PitchSlider"
import AudioControls from "../../SharedComponents/AudioControls"
import Button from "@material-ui/core/Button"
import {useTitle} from '../../State/TitleContext'
import {useBinauralBeat} from "../../State/BinauralBeatContext";
import ExtrasForm from "./ExtrasForm";
import FrequencyRangeHelper from "../../Helpers/FrequencyRangeHelper";
import ProgressWheel from "../../SharedComponents/ProgressWheel";

interface PresetShowScreenProps {
    location: any
}

const BinauralBeatEditScreen: FunctionComponent<PresetShowScreenProps> = (props) => {
    const {setTitle} = useTitle()
    const {gradient, setGradient} = useGradient()
    const {binauralBeatState, setBinauralBeatState} = useBinauralBeat()
    const {preset_id} = useParams()
    const classes = useStyles(gradient.toProps())

    const computeAudioControlsState = () => {
        if (binauralBeatState.playing) {
            return 'play'
        } else {
            return 'pause'
        }
    }

    useEffect(() => {
        const localBeatState = props.location.binauralBeatState
        if (localBeatState) {
            setTitle(`${FrequencyRangeHelper.rangeSymbol(localBeatState.carrierOscillator)} ${localBeatState.name}`)
            setGradient(FrequencyRangeHelper.generateGradient(localBeatState.carrierOscillator))
            setBinauralBeatState(localBeatState)
        } else {
            NetworkService
                .getInstance()
                .get(Routes.BinauralBeatShow(preset_id))
                .then(function (json) {
                     const { binauralBeatState } = json
                     const { carrierOscillator } = binauralBeatState
                     setTitle(`${FrequencyRangeHelper.rangeSymbol(carrierOscillator)} ${binauralBeatState.name}`)
                     setGradient(FrequencyRangeHelper.generateGradient(carrierOscillator))
                     setBinauralBeatState(binauralBeatState)
                })
        }
    }, [])
    if (binauralBeatState) {
        const binauralBeat = BinauralBeat.getInstance(binauralBeatState)
        return (
            <Paper className={classes.presetFormCard} elevation={0}>
                <div className={classes.headerContainer}>
                    <span className={classes.presetHeader}>{binauralBeatState.name}</span>
                    <span
                        className={classes.presetSubtext}> ({FrequencyRangeHelper.rangeString(binauralBeatState.carrierOscillator)})</span>
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
                        <Button variant="contained" className={classes.saveButton}>
                            Save
                        </Button>
                    </div>
                </div>
                <ExtrasForm
                    gradient={gradient}
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
export default BinauralBeatEditScreen