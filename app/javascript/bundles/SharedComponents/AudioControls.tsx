import * as React from 'react';
import {FunctionComponent} from "react";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
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
            <IconButton disabled={playDisabled()} aria-label="play" onClick={props.handlePlayPress}>
                <PlayArrowIcon/>
            </IconButton>
            <IconButton disabled={pauseDisabled()} aria-label="pause" onClick={props.handlePausePress}>
                <Pause/>
            </IconButton>
        </div>
    )
}

export default AudioControls