import * as React from 'react';
import {FunctionComponent, useEffect, useState} from 'react'
import NetworkService from "../../Network/NetworkService";
import Routes from "../../Network/Routes";
import Preset from '../../Models/Preset';
import { useParams } from 'react-router-dom';
import Mixer from '../../Models/Mixer';
interface PresetShowScreenProps {
// buttonText: string;
}


const PresetShowScreen: FunctionComponent<PresetShowScreenProps> = (props) => {
    const [preset, setPreset] = useState(new Preset({}))
    const { preset_id } = useParams();

    useEffect(()=> {
        NetworkService
            .getInstance()
            .get(Routes.PresetShow(preset_id))
            .then(function (json) {
                const preset = new Preset(json.preset);
                setPreset(preset);
            })},[])

    if (preset) {
        // fix me, this should be triggered by user input
        const mx = new Mixer(preset.left, preset.right)
        return (
          <h1>There is a preset here it be bruv: {preset.name} </h1>
        );
    } else {
        return (
          <h1> loading </h1>
        );
    }
}

export default PresetShowScreen