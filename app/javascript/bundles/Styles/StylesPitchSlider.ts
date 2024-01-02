import {makeStyles} from "@material-ui/styles";
import Colors from './Colors';

const boxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';
const styles = {
    root: {
        height: 2,
        padding: '15px 0',
    },
    thumb: {
        height: 28,
        width: 28,
        backgroundColor: '#fff',
        boxShadow: boxShadow,
        marginTop: -14,
        marginLeft: -14,
        '&:focus, &:hover, &$active': {
            boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                boxShadow: boxShadow,
            },
        },
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
    root: {},
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
                borderBottom: `2px solid ${Colors.borderGrey}`
            },
            '&:after': {
                borderBottom: `2px solid ${Colors.defaultBlue}`
            }
        }
    })
})

export default styles
