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
            <Grid container spacing={2} className={classes.gridContainer}> {
                presets.map((preset: Preset) => {
                    return (
                        <Grid item xs={4} lg={4}>
                            <Card>
                                <CardContent>
                                    <div className={classes.cardContent}>
                                        <Typography component="h5" variant="h5">
                                        <span className={classes[preset.rangeString()]}>
                                            <span>{preset.rangeSymbol()} &nbsp;</span>
                                        </span>
                                            {preset.name}
                                        </Typography>
                                        <Link to={`/preset_show/${preset.id}`}>Edit</Link>
                                    </div>
                                    {/*<span className={classes[preset.rangeString()]}>*/}
                                    {/*    <span>{preset.rangeSymbol()} &nbsp;</span>*/}
                                    {/*    <p className={classes.rangeString}>{preset.rangeString()}</p>*/}
                                    {/*</span>*/}
                                </CardContent>
                                <div className={classes.controls}>
                                    <IconButton aria-label="previous">
                                        {"TODO?" === 'rtl' ? <SkipNextIcon/> : <SkipPreviousIcon/>}
                                    </IconButton>
                                    <IconButton aria-label="play/pause">
                                        <PlayArrowIcon className={classes.playArrowIcon}/>
                                    </IconButton>
                                    <IconButton aria-label="next">
                                        {"TODO?" === 'rtl' ? <SkipPreviousIcon/> : <SkipNextIcon/>}
                                    </IconButton>
                                </div>
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