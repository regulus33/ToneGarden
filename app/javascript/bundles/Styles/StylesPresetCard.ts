import {makeStyles} from "@material-ui/core/styles";
import Gradient from "../Models/Gradient";
import {rangeStrings} from "../Utils/HardCoded";
import Breakpoints from "./Breakpoints";

const gradients = new Object

rangeStrings.forEach((str) => {
    gradients[str] = new Gradient(str).backGround();
})

const useStyles = makeStyles({
    presetCard: {
        [`@media (max-width: ${Breakpoints.mobile})`]: {
            maxWidth: '100%',
        },
        maxWidth: '250px',
    },
    controls: {
        display: 'flex',
        justifyContent: 'center',
    },
    playArrowIcon: {
        width: 32,
        height: 32
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
        background: gradients['alpha'],
        backgroundClip: 'text',
        '-webkit-text-fill-color': 'transparent'

    },
    'beta': {
        background: gradients['beta'],
        backgroundClip: 'text',
        '-webkit-text-fill-color': 'transparent'
    },
    'gamma': {
        background: gradients['gamma'],
        backgroundClip: 'text',
        '-webkit-text-fill-color': 'transparent'
    },
    'theta': {
        background: gradients['theta'],
        backgroundClip: 'text',
        '-webkit-text-fill-color': 'transparent'
    },
    'delta': {
        background: gradients['delta'],
        backgroundClip: 'text',
        '-webkit-text-fill-color': 'transparent'
    }
});

export default useStyles