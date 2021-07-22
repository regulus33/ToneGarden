import * as React from 'react'
import {FormEvent, FunctionComponent} from 'react'
import PitchSlider from "./PitchSlider"
import Gradient from "../Models/Gradient";
import {Accordion, AccordionSummary, Typography} from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from "../Styles/StylesExtrasForm"
import {useStyles as useStylesAuth} from "../Styles/StylesAuthForm"
import TextField from "@material-ui/core/TextField";
import FunctionName from "../Utils/FunctionName";

interface Props {
    gradient: Gradient,
    onNameChange: (event: FormEvent<HTMLDivElement>) => void,
    onVolumeChange: (value: number) => void,
    onNoiseLevelChange: (value: number) => void,
    noiseLevel: number,
    error: string,
    name?: string,
    volume: number,
}

const ExtrasForm: FunctionComponent<Props> = (props) => {
    const classes = useStyles(props.gradient.toProps())
    const classesAuth = useStylesAuth(props.gradient.toProps())
    console.log(`[${FunctionName()}]: value of ${'noiseLevel'}: ${props.noiseLevel}`)
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
                        default={props.volume}
                        handleSliderChangeCallback={props.onVolumeChange}
                    />
                </div>
                <div className={classes.largeSlider}>
                    <PitchSlider
                        minMax={[0, 0.1]}
                        step={0.001}
                        label={'Noise'}
                        default={props.noiseLevel}
                        handleSliderChangeCallback={props.onNoiseLevelChange}
                    />
                </div>
            </Accordion>
        </div>
    )

}

export default ExtrasForm