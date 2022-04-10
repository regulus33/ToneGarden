import {makeStyles} from "@mui/styles";
import Colors from './Colors';
import Breakpoints from "./Breakpoints";

const FORM_PADDING = '0 8px'

const styles = {
    root: {
        height: 2,
        padding: '15px 0',
        [`@media(max-width: ${Breakpoints.xsMobile})`]: {}
    },
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
        padding: FORM_PADDING
    },
    customSlider: (props: Props) => ({
        marginTop: '8px',
        '& > span': {
            '&:nth-child(2)': {
                color: props.dominantColor
            }
        },
    }),
    textField: (props: Props) => ({
        '& div': {
            display: props.textInputDisplay,
            '&:before': {
                borderBottom: `.14rem solid ${Colors.borderGrey}`
            },
            '&:after': {
                borderBottom: `.14rem solid ${Colors.defaultBlue}`
            }
        },
        padding: FORM_PADDING
    })
})

export default styles
