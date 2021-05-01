import * as React from 'react';
import {FunctionComponent, useEffect, useState} from 'react'
import NetworkService from "../../Network/NetworkService";
import Routes from "../../Network/Routes";
import Preset from '../../Models/Preset';
import {useParams} from 'react-router-dom';
import BinauralBeat from '../../Models/BinauralBeat';
import useStyles from '../../Styles/StylesPresetShowScreen'
import {useGradient} from "../../State/GradientContext";
import Paper     from '@material-ui/core/Paper';
import PitchSlider from "../../SharedComponents/PitchSlider";
import AudioControls from "../../SharedComponents/AudioControls";
import Button from "@material-ui/core/Button";
import {useTitle} from '../../State/TitleContext'
import {useBinauralBeat} from "../../State/BinauralBeatContext";

interface PresetShowScreenProps {
}

const PresetShowScreen: FunctionComponent<PresetShowScreenProps> = (props) => {
    const {setTitle} = useTitle();
    const {gradient, setGradient} = useGradient();
    const {binauralBeat, setBinauralBeat} = useBinauralBeat();
    const [preset, setPreset] = useState(new Preset({}));
    const {preset_id} = useParams();
    const classes = useStyles(gradient.toProps());
    useEffect(() => {
        NetworkService
            .getInstance()
            .get(Routes.PresetShow(preset_id))
            .then(function (json) {
                const preset = new Preset(json.preset);
                setTitle(`${preset.rangeSymbol()} ${preset.name}`)
                setGradient(preset.gradient())
                setPreset(preset);
            })
    }, [])
    if (preset) {
        const binauralBeat = BinauralBeat.getInstance(preset.left, preset.right)
        return (
            <Paper className={classes.presetFormCard}>
                <div className={classes.pitchSliderContainer}>
                <PitchSlider
                    minMax={BinauralBeat.beatMinMax}
                    label={'Main tone'}
                    default={binauralBeat.beatOscillator.frequency}
                    handleSliderChangeCallback={binauralBeat.onBeatFreqChange}
                />
                <PitchSlider
                    minMax={BinauralBeat.carrierMinMax}
                    label={'Secondary tone'}
                    default={binauralBeat.carrierOscillator.offset}
                    handleSliderChangeCallback={binauralBeat.onCarrierFreqChange}
                />
                </div>
                <div className={classes.audioControlsContainer}>
                    <AudioControls handlePlayPress={binauralBeat.play} handlePausePress={binauralBeat.pause}/>
                    <div className={classes.saveButtonContainer}>
                        <Button variant="contained" className={classes.saveButton}>
                            Save
                        </Button>
                    </div>
                </div>
            </Paper>
        );
    } else {
        return (
            <h1> loading </h1>
        );
    }
}

export default PresetShowScreen