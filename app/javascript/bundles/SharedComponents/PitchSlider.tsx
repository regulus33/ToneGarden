import * as React from "react";
import {FunctionComponent} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import styles, { useStyles } from '../Styles/StylesPitchSlider'

const CustomSlider = withStyles(styles)(Slider);

interface PitchSliderProps {
    label: string,
    minMax: Array<number>
    default: number,
   updatePitch: (number: number) => void,
}

const PitchSlider: FunctionComponent<PitchSliderProps> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography gutterBottom>{ props.label }</Typography>
            <CustomSlider min={props.minMax[0]} max={props.minMax[1]} aria-label="ios slider" defaultValue={props.default} valueLabelDisplay="on" />
        </div>
    );
}

export default PitchSlider