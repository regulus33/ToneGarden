import * as React from 'react'
import {FormEvent, FunctionComponent} from 'react'
import BinauralBeat from '../Models/BinauralBeat'
import PitchSlider from "./PitchSlider"
import Gradient from "../Models/Gradient";
import {Accordion, AccordionSummary, Typography} from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from "../Styles/StylesExtrasForm"
import {useStyles as useStylesAuth} from "../Styles/StylesAuthForm"
import TextField from "@material-ui/core/TextField";

interface Props {
    gradient: Gradient,
    onNameChange: (event: FormEvent<HTMLDivElement>) => void,
    error: string,
    name?: string,
}

const ExtrasForm: FunctionComponent<Props> = (props) => {
    const classes = useStyles(props.gradient.toProps())
    const classesAuth = useStylesAuth(props.gradient.toProps())

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
                    <TextField
                        fullWidth
                        error={!!props.error}
                        helperText={props.error}
                        inputProps={{ maxLength: 24}}
                        onInput={props.onNameChange}
                        variant='standard'
                        label={'Name'}
                        value={props.name ? props.name : undefined}
                        className={classesAuth.textField}
                        placeholder='Binaural beat'/>
                </div>
                <div className={classes.largeSlider}>
                    <PitchSlider
                        minMax={[-80, 0]}
                        label={'Volume'}
                        default={BinauralBeat.getInstance().volume}
                        handleSliderChangeCallback={BinauralBeat.getInstance().onVolumeChange}
                    />
                </div>
            </Accordion>
        </div>
    )

}

export default ExtrasForm