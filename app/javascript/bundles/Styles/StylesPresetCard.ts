import {makeStyles} from "@material-ui/core/styles";
import Gradient from "../Models/Gradient";
import Breakpoints from "./Breakpoints";
import {symbol} from "prop-types";

const gradients = {}

const symbolGradients = {}

Gradient.rangeStrings.forEach((str) => {
    gradients[str] = new Gradient(str).backGround();
})

Gradient.rangeStrings.forEach((str) => {
    symbolGradients[str] = new Gradient(str).rangeSymbolBackground();
})

const circle = {
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const styleOptions = {
    avatar: {
        position: 'relative',
        left: '8px'
    },
    avatarFill: {
        backgroundColor: 'white',
        width: '47px',
        height: '47px',
        ...circle
    },
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
}

Gradient.rangeStrings.forEach(function (name) {
    styleOptions[name] = {
        background: symbolGradients[name],
        backgroundClip: 'text',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        '-moz-background-clip': 'text',
        '-moz-text-fill-color': 'transparent'
    }
    styleOptions[`avatarContainer${name}`] = {
        background: gradients[name],
        width: '50px',
        height: '50px',
        position: 'relative',
        top: '-5px',
        ...circle
    }
})

// @ts-ignore
const useStyles = makeStyles(styleOptions)

export default useStyles