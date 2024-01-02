import * as React from 'react';
import {FunctionComponent, useEffect, useState} from 'react'
import NetworkService from "../../Network/NetworkService";
import Routes from "../../Network/Routes";
import Preset from '../../Models/Preset';
import {useParams} from 'react-router-dom';
import BinauralBeat from '../../Models/BinauralBeat';
import {useTitle} from '../../State/TitleContext'
import useStyles from '../../Styles/StylesPresetShowScreen'
import {useGradient} from "../../State/GradientContext";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {CardHeader, Slider} from "@material-ui/core";
import PitchSlider from "../../SharedComponents/PitchSlider";

interface PresetShowScreenProps {
// buttonText: string;
}

const PresetShowScreen: FunctionComponent<PresetShowScreenProps> = (props) => {
    const {setTitle} = useTitle();
    const {setGradient} = useGradient();
    const [preset, setPreset] = useState(new Preset({}));
    const {preset_id} = useParams();
    const classes = useStyles();
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
        const beat = BinauralBeat.getInstance(preset.left, preset.right)
        return (
            <Card className={classes.presetFormCard}>
                <CardContent>
                    <CardHeader title={'Edit'}/>
                </CardContent>
                <div className={classes.pitchSliderContainer}>
                <PitchSlider
                    minMax={beat.leftOscillatorMinMax()}
                    label={'Main tone'}
                    default={beat.beatOscillator.frequency}
                    updatePitch={beat.setBeatFrequency}
                />
                <PitchSlider
                    minMax={beat.rightOscillatorMinMax()}
                    label={'Secondary tone'}
                    default={beat.carrierOscillator.offset}
                    updatePitch={beat.updateRightPitch}
                />
                </div>
            </Card>
        );
    } else {
        return (
            <h1> loading </h1>
        );
    }
}

export default PresetShowScreen