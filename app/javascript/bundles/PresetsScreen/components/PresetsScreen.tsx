import * as React from 'react';
import {FunctionComponent, useEffect, useState} from 'react'
import NetworkService from "../../Network/NetworkService";
import Routes from "../../Network/Routes";
import Preset from '../../Models/Preset';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import PresetsList from '../../Models/PresetsList';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress'
import {makeStyles} from '@material-ui/core/styles';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Gradient from "../../Models/Gradient";
import SkipNextIcon from '@material-ui/icons/SkipNext';
import useStyles from "../../Styles/StylesPresetsScreen";

interface PresetsScreenProps {
// buttonText: string;
}

const PresetsScreen: FunctionComponent<PresetsScreenProps> = (props) => {
    const [presets, setPresets] = useState([]);
    const classes = useStyles();
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
            <Grid container spacing={2}>                    {
                presets.map((preset: Preset) => {
                    return (
                        <Grid item xs={2} md={4} lg={4}>
                            <Card>
                                <CardContent>
                                    <Typography component="h5" variant="h5">
                                        { preset.name }
                                    </Typography>
                                    <div className={ classes[preset.rangeString()] }>
                                        <span>{ preset.rangeSymbol() } &nbsp;</span>
                                        <p className={ classes.rangeString }>{ preset.rangeString() }</p>
                                    </div>
                                </CardContent>
                            </Card>
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