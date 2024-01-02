import * as React from 'react';
import {FunctionComponent} from "react";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import useStyles from "../Styles/StylesAudioControls";

interface AudioControlsProps {
    handlePlayPress: ()=> void,
    handlePausePress: ()=> void
}

const AudioControls: FunctionComponent<AudioControlsProps> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.controlsContainer}>
            <IconButton aria-label="play/pause" onClick={props.handlePlayPress}>
                <PlayArrowIcon/>
            </IconButton>
            <IconButton aria-label="play/pause" onClick={props.handlePausePress}>
                <Pause/>
            </IconButton>
        </div>
    )
}

export default AudioControls