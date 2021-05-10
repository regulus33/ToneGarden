import * as React from 'react'
import {FunctionComponent} from 'react'
import BinauralBeat from '../../Models/BinauralBeat'
import PitchSlider from "../../SharedComponents/PitchSlider"
import Gradient from "../../Models/Gradient";
import {Accordion, AccordionSummary, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from "../../Styles/StylesExtrasForm"

interface Props {
    gradient: Gradient,
    binauralBeat: BinauralBeat,
}

const ExtrasForm: FunctionComponent<Props> = (props) => {
    const classes = useStyles(props.gradient.toProps())

    return (
        <div className={classes.root}>
            <Accordion className={classes.accordian}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1c-content"
                    id="panel1c-header">
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>More</Typography>
                    </div>
                </AccordionSummary>
                <div className={classes.largeSlider}>
                    <PitchSlider
                        minMax={[-80, 0]}
                        label={'Volume'}
                        default={props.binauralBeat.volume}
                        handleSliderChangeCallback={props.binauralBeat.onVolumeChange}
                    />
                </div>
                <div className={classes.largeSlider}>
                    <PitchSlider
                        minMax={[-80, 0]}
                        label={'Volume'}
                        default={props.binauralBeat.noiseSource.level}
                        handleSliderChangeCallback={props.binauralBeat.onNoiseLevelChange}
                    />
                </div>
            </Accordion>
        </div>
    )

}

export default ExtrasForm