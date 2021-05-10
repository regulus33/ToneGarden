import {makeStyles} from "@material-ui/core";
import Breakpoints from "./Breakpoints";

interface Props {
    dominantColor: string,
    secondaryColor: string,
}

const useStyles = makeStyles({
    saveButton: (props: Props) => ({
        backgroundColor: props.dominantColor,
        color: 'white',
        '&:hover': {
            background: props.secondaryColor,
        }
    }),
    headerContainer: {
        padding: '1.1rem 2.2rem'
    },
    presetFormCard: {
        height: 'fit-content',
        minWidth: '35rem',
        margin: '0 auto',
        [`@media (max-width: ${Breakpoints.mobile})`]: {
            minWidth: 0,
            width: 'calc(100vw - 2.28rem)'
        }
    },
    pitchSliderContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '1.7rem .6rem',
    },
    audioControlsContainer: {
        marginTop: '2.28rem',
        display: 'flex',
        padding: '0 1.07rem 0 1.2rem',
        justifyContent: 'space-between',
        '& svg': {
            transform: 'scale(130%)',
        }
    },
    saveButtonContainer: {
        marginRight: '1.57rem'
    }
})

export default useStyles


