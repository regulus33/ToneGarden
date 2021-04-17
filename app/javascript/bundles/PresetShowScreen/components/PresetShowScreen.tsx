import * as React from 'react';
import {FunctionComponent, useEffect, useState} from 'react'
import NetworkService from "../../Network/NetworkService";
import Routes from "../../Network/Routes";
import Preset from '../../Models/Preset';
import { useParams } from 'react-router-dom';
import Mixer from '../../Models/Mixer';
import {useTitle} from '../../State/TitleContext'
import Slider from '@material-ui/core/Slider';
import {Card} from "@material-ui/core";
import useStyles from '../../Styles/StylesPresetShowScreen'
import {useGradient} from "../../State/GradientContext";

interface PresetShowScreenProps {
// buttonText: string;
}


const PresetShowScreen: FunctionComponent<PresetShowScreenProps> = (props) => {
    const { setTitle } = useTitle();
    const { setGradient } = useGradient();
    const [preset, setPreset] = useState(new Preset({}));
    const { preset_id } = useParams();
    const classes = useStyles();
    useEffect(()=> {
        NetworkService
            .getInstance()
            .get(Routes.PresetShow(preset_id))
            .then(function (json) {
                const preset = new Preset(json.preset);
                setTitle(`${preset.rangeSymbol()} ${preset.name}`)
                setGradient(preset.gradient())
                setPreset(preset);
            })},[])
    if (preset) {
        const mx = new Mixer(preset.left, preset.right)
        return (
           <div>jkj</div>
        );
    } else {
        return (
          <h1> loading </h1>
        );
    }
}

export default PresetShowScreen