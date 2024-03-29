import * as React from "react";
import {ChangeEvent, FunctionComponent, useEffect, useState} from "react";
import {withStyles} from "@mui/styles";
import {Slider} from "@mui/material";
import {TextField} from "@mui/material";
import styles, {useStyles} from "../Styles/StylesPitchSlider"
import {useGradient} from "../State/GradientContext";

/**
 * @remarks useEffect is necessary here as per: https://stackoverflow.com/questions/57845087/usestate-not-setting-initial-state
 * We need to check the type of `value` because it can be a blank string as both slider and textinput share it
 * @param label appears above input
 * @param minMax an array of the upper and lower bounds of the slider
 * @param defuault the initial value of the input (used by set state)
 */

interface PitchSliderProps {
    label: string,
    minMax: Array<number>,
    default: number,
    handleSliderChangeCallback: (sliderValue: number) => void,
    showTextInput?: boolean,
    step?: number,
    handleBlur?: (sliderValue: number) => void,
}

const PitchSlider: FunctionComponent<PitchSliderProps> = (props) => {
    const { gradient } = useGradient();
    const [ errorText, setErrorText] = useState(null)
    const classes = useStyles({
        textInputDisplay: (props.showTextInput ? 'inherit' : 'none'),
        ...gradient.toProps()
    })

    const [value, setValue] = useState<number|string>(props.default);

    const handleSliderChange = (event: ChangeEvent, newValue: number | number[], activeThumb: number) => {
        setValue(Number(newValue))
        props.handleSliderChangeCallback(Number(newValue))
    }

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const numerize = (test: number|string): number => {
        if(isNaN(Number(test))) return 0
        return Number(test)
    }

    // Make sure text input value is within boundary then update osc
    const handleBlur = () => {
       let adjustedValue: number
        // if its not - or 0-9
        if(!String(value).match(/[\d^-]/)) {
            adjustedValue = 0
             setValue(adjustedValue)
        }
        if(value > props.minMax[1]) {
            adjustedValue = props.minMax[1]
            setValue(adjustedValue)
        } else if(value < props.minMax[0]) {
            adjustedValue = props.minMax[0]
            setValue(adjustedValue)
        }

        const processedValue = Number(adjustedValue || value)

        props.handleSliderChangeCallback(processedValue)
        if(!!props.handleBlur) {
            props.handleBlur(processedValue)
        }
    }

    useEffect(()=>{
        setValue(props.default)
    },[props.default])

    // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
        <form
            className={classes.root}
            noValidate
            autoComplete="off">
            <TextField
                className={classes.textField}
                error={errorText != null}
                onBlur={handleBlur}
                onChange={handleTextChange}
                label={errorText != null ? errorText : props.label}
                variant="standard"
                value={value}/>
            <div className={classes.root}>
                <Slider
                    step={props.step || 1}
                    className={classes.customSlider}
                    value={numerize(value)}
                    onMouseUp={handleBlur}
                    // TODO: is there more to this than meets the eye?
                    // @ts-ignore
                    onChange={handleSliderChange}
                    min={props.minMax[0]}
                    max={props.minMax[1]}
                    defaultValue={numerize(value)}
                />
            </div>
        </form>

    );
}

export default PitchSlider
