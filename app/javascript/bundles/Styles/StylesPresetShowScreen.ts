import {makeStyles} from "@material-ui/core";
import Breakpoints from "./Breakpoints";

interface Props {
    dominantColor: string,
    secondaryColor: string,
}

// @ts-ignore
const useStyles = makeStyles({
    saveButton: (props: Props) => ({
        backgroundColor: props.dominantColor,
        color: 'white',
        '&:hover': {
            background: props.secondaryColor,
        },
    }),
    headerContainer: {
        padding: '1.1rem 2.2rem'
    },
    presetHeader: {
        fontSize: '1.6rem',
    },
    presetSubtext: {
      fontSize: '1rem'
    },
    presetFormCard: {
        height: 'fit-content',
        margin: '0 auto',
        width: `660px`,
        marginTop: '175px',
        [`@media (max-width: ${Breakpoints.mobile})`]: {
            minWidth: `100%`,
            width: `100vw`
            // width: 'calc(100vw - 3rem)'
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


