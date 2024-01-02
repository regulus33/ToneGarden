import {makeStyles} from "@material-ui/core/styles";
import Gradient from "../Models/Gradient";
import {rangeStrings} from "../Utils/HardCoded";
import Breakpoints from "./Breakpoints";

const gradients = {}

rangeStrings.forEach((str) => {
    gradients[str] = new Gradient(str).backGround();
})

const useStyles = makeStyles({
    presetCard: {
        margin: 'auto',
        [`@media (max-width: ${Breakpoints.mobile})`]: {
            maxWidth: '100%',
        },
        maxWidth: '18rem',
    },
    controls: {
        display: 'flex',
        justifyContent: 'center',
    },
    playArrowIcon: {
        width: '2.28rem',
        height: '2.28rem'
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    rangeString: {
        '&::first-letter': {
            textTransform: 'uppercase',
        },
        display: 'inline-block'
    },
    'alpha': {
        backgroundImage: gradients['alpha'],
        backgroundClip: 'text',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        '-moz-background-clip': 'text',
        '-moz-text-fill-color': 'transparent'

    },
    'beta': {
        background: gradients['beta'],
        backgroundClip: 'text',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        '-moz-background-clip': 'text',
        '-moz-text-fill-color': 'transparent'
    },
    'gamma': {
        background: gradients['gamma'],
        backgroundClip: 'text',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        '-moz-background-clip': 'text',
        '-moz-text-fill-color': 'transparent'
    },
    'theta': {
        background: gradients['theta'],
        backgroundClip: 'text',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        '-moz-background-clip': 'text',
        '-moz-text-fill-color': 'transparent'
    },
    'delta': {
        background: gradients['delta'],
        backgroundClip: 'text',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        '-moz-background-clip': 'text',
        '-moz-text-fill-color': 'transparent'
    }
});

export default useStyles