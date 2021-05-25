import * as React from "react";
import {ChangeEvent, Dispatch, FunctionComponent} from "react";
import {withStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import styles, {useStyles} from '../Styles/StylesPitchSlider'
import {useGradient} from "../State/GradientContext";

const CustomSlider = withStyles(styles)(Slider);

interface PitchSliderProps {
    label: string,
    minMax: Array<number>,
    default: number,
    handleSliderChangeCallback: (sliderValue: number) => void,
    handleSliderBlurCallback?: (sliderValue: number) => void,
    showTextInput?: boolean,
}

const PitchSlider: FunctionComponent<PitchSliderProps> = (props) => {
    console.log('hi there, this is PitchSlider. default is: ' + props.default)

    const { gradient } = useGradient();

    const classes = useStyles({
        textInputDisplay: (props.showTextInput ? 'inherit' : 'none'),
        ...gradient.toProps()
    })

    const [value, setValue] = React.useState<number | string | Array<number | string>>(props.default);

    const handleSliderChange = (event: ChangeEvent, newValue: number) => {
        setValue(Number(newValue))
        console.log('handle slider change' + newValue)
        props.handleSliderChangeCallback(Number(newValue))
    }

    // Changes display only handleBlur updates oscillators
    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    }

    // Make sure text input value is within boundary then update osc
    const handleBlur = () => {
        if(value > props.minMax[1]) {
            setValue(props.minMax[1])
        } else if(value < props.minMax[0]) {
            setValue(props.minMax[0])
        }
        props.handleSliderChangeCallback(Number(value))
        if(props.handleSliderBlurCallback) {
            props.handleSliderBlurCallback(Number(value))
        }
    };

    console.log(props.default)
    return (
        <form
            className={classes.root}
            noValidate
            autoComplete="off">
            <TextField
                className={classes.textField}
                onBlur={handleBlur}
                onChange={handleTextChange}
                label={props.label}
                variant="standard"
                value={value}/>
            <div className={classes.root}>
                <CustomSlider
                    className={classes.customSlider}
                    value={typeof value === 'number' ? value : 0}
                    onMouseUp={handleBlur}
                    onChange={handleSliderChange}
                    min={props.minMax[0]}
                    max={props.minMax[1]}
                    defaultValue={props.default}
                    valueLabelDisplay="on"/>
            </div>
        </form>

    );
}

export default PitchSlider