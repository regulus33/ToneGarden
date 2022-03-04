import * as React from 'react';
import {FunctionComponent} from "react";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Pause from "@mui/icons-material/Pause";
import useStyles from "../Styles/StylesAudioControls";

interface AudioControlsProps {
    handlePlayPress: ()=> void,
    handlePausePress: ()=> void,
    disabledButton: 'play'| 'pause' | 'both' | 'none'
}

const AudioControls: FunctionComponent<AudioControlsProps> = (props) => {
    const classes = useStyles();

    const bothDisabled = () => {
        return props.disabledButton === 'both'
    }

    const playDisabled = () => {
        return props.disabledButton === 'play' || bothDisabled()
    }

    const pauseDisabled = () => {
        return props.disabledButton === 'pause' || bothDisabled()
    }

    return (
        <div className={classes.controlsContainer}>
            <IconButton
                disabled={playDisabled()}
                aria-label="play"
                onClick={props.handlePlayPress}
                size="large">
                <PlayArrowIcon/>
            </IconButton>
            <IconButton
                disabled={pauseDisabled()}
                aria-label="pause"
                onClick={props.handlePausePress}
                size="large">
                <Pause/>
            </IconButton>
        </div>
    );
}

export default AudioControls