import * as React from 'react';
import {FunctionComponent, useEffect, useState} from 'react'
import NetworkService from "../../Network/NetworkService";
import Routes from "../../Network/Routes";
import Preset from '../../Models/Preset';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import PresetsList from '../../Models/PresetsList';
import CircularProgress from '@material-ui/core/CircularProgress'
import PresetCard from "./PresetCard";
import {useTitle} from "../../State/TitleContext";

interface PresetsScreenProps {
}

const PresetsScreen: FunctionComponent<PresetsScreenProps> = (props) => {
    const { setTitle } = useTitle();
        setTitle('Select Preset');
    const [presets, setPresets] = useState([]);
    useEffect(() => {
        NetworkService
            .getInstance()
            .get(Routes.Presets)
            .then(function (json) {
                const presets = new PresetsList(json.presets).presets;
                setPresets(presets);
            })
    }, [])

    if (presets.length > 0) {
        return (
            <Grid container spacing={2}> {
                presets.map((preset: Preset) => {
                    return (
                        <Grid item xs={12} sm={12}  lg={4}>
                            <PresetCard preset={preset}/>
                        </Grid>
                    )
                })
            }
            </Grid>
        );
    } else {
        return (
            <Container>
                <CircularProgress/>
                <CircularProgress color="secondary"/>
            </Container>
        );
    }
}

export default PresetsScreen