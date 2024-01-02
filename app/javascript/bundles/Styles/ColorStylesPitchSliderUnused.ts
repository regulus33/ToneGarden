import {makeStyles} from "@mui/styles";
import Colors from './Colors';
import Breakpoints from "./Breakpoints";
import FunctionName from "../Utils/FunctionName";
import {hexToRgb} from "@mui/material";

const styles = {
    root: {
        height: 2,
        padding: '15px 0',
        [`@media(max-width: ${Breakpoints.xsMobile})`]: {}
    },
    thumb: {
        height: 28,
        width: 28,
        backgroundColor: '#fff',
        marginTop: -14,
        marginLeft: -14,

    },
    active: {},
    valueLabel: {
        display: 'none',
        '& *': {
            background: 'transparent',
            color: '#000',
        },
    },
    track: {
        height: 2,
    },
    rail: {
        height: 2,
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    }
}

interface Props {
    dominantColor: string,
    textInputDisplay: string
}

export const useStyles = makeStyles({
    root: {
        [`@media(max-width: ${Breakpoints.xsMobile})`]: {
            maxWidth: '120px'
        }
    },
    customSlider: (props: Props) => {
        const rgb = hexToRgb(props.dominantColor)
        const rgbString = `${rgb[0]},${rgb[1]},${rgb[2]}`
        const initialBoxShadow = `0 3px 1px rgba(${rgbString},0.4),0 4px 8px rgba(${'0, 0, 0'},0.13),0 0 0 1px rgba(${rgbString},0.02)`
        console.log(`[${FunctionName()}]: value of rgb: ${rgbString}`)
        return {
            marginTop: '8px',
            '& > span': {
                '&:nth-child(2)': {
                    color: props.dominantColor
                },
                '&:nth-child(4)': {
                    boxShadow: initialBoxShadow,
                    '&:focus, &:hover,': {
                        boxShadow: `0 3px 1px rgba(${rgbString},0.1),0 4px 8px rgba(${rgbString},0.3),0 0 0 1px rgba(${rgbString}, 0.1)`,
                        // Reset on touch devices, it doesn't add specificity
                        '@media (hover: none)': {
                            boxShadow: initialBoxShadow,
                        },
                    },
                    '&:active': {
                        boxShadow: `0px 0px 2px 1px rgba(${rgbString},0.38);`
                    }
                },
            },
        }
    },

    textField: (props: Props) => ({
        '& div': {
            display: props.textInputDisplay,
            '&:before': {
                borderBottom: `.14rem solid ${Colors.borderGrey}`
            },
            '&:after': {
                borderBottom: `.14rem solid ${Colors.defaultBlue}`
            },

        }
    })
})

export default styles
