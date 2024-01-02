import * as React from 'react'
import {FormEvent, FunctionComponent} from 'react'
import PitchSlider from "./PitchSlider"
import Gradient from "../Models/Gradient";
import {Accordion, AccordionSummary, Typography} from "@mui/material"
import {ExpandMore} from '@mui/icons-material'
import useStyles from "../Styles/StylesExtrasForm"
import {useStyles as useStylesAuth} from "../Styles/StylesAuthForm"
import {TextField} from "@mui/material";
import FunctionName from "../Utils/FunctionName";
import {useWhiteNoiseCtx} from "../State/UseWhiteNoiseContext";

interface Props {
  gradient: Gradient,
  onNameChange: (event: FormEvent<HTMLDivElement>) => void,
  onVolumeChange: (value: number) => void,
  onNoiseLevelChange: (value: number) => void,
  onAccordianChange: (event: any) => void,
  noiseLevel: number,
  error: string,
  name?: string,
  volume: number,
}

const ExtrasForm: FunctionComponent<Props> = (props) => {
  const classes = useStyles(props.gradient.toProps())
  const classesAuth = useStylesAuth(props.gradient.toProps())
  const {useWhiteNoise} = useWhiteNoiseCtx()

  const noiseSlider = () => {
    if (useWhiteNoise) return (
      <div className={classes.largeSlider}>
        <PitchSlider
          minMax={[-33, 0]}
          step={0.001}
          label={'Noise'}
          default={props.noiseLevel}
          handleSliderChangeCallback={props.onNoiseLevelChange}/>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <Accordion className={classes.accordion} onChange={props.onAccordianChange}>
        <AccordionSummary
          expandIcon={<ExpandMore/>}
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
            inputProps={{maxLength: 24}}
            onInput={props.onNameChange}
            variant='standard'
            label={'Name'}
            value={props.name ? props.name : undefined}
            className={classesAuth.textField}
            placeholder='Binaural beat'/>
        </div>
        <div className={classes.largeSlider}>
          <PitchSlider
            minMax={[0, 1]}
            label={'Volume'}
            step={0.001}
            default={props.volume}
            handleSliderChangeCallback={props.onVolumeChange}
          />
        </div>
        {noiseSlider()}
      </Accordion>
    </div>
  )

}

export default ExtrasForm
