import {makeStyles} from "@material-ui/core/styles";
import Gradient from "../Models/Gradient";
import { rangeStrings } from "../Utils/HardCoded";
import Colors from "./Colors";

const gradients = new Object

rangeStrings.forEach((str) => {
    let pair = new Gradient(str).gradientPair()

    gradients[str] =  `linear-gradient(to right, ${pair[0]}, ${pair[1]})`
})

const useStyles = makeStyles({
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
    gridContainer: {
        backgroundColor: Colors.backgroundGrey
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