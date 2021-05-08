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
        padding: '16px 32px'
    },
    presetFormCard: {
        height: 'fit-content',
        minWidth: '500px',
        margin: '0 auto',
        [`@media (max-width: ${Breakpoints.mobile})`]: {
            minWidth: 0,
            width: 'calc(100vw - 32px)'
        }
    },
    pitchSliderContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '24px 0'
    },
    audioControlsContainer: {
        marginTop: '32px',
        display: 'flex',
        padding: '0 15px 0 17px',
        justifyContent: 'space-between',
        '& svg': {
            transform: 'scale(130%)',
        }
    },
    saveButtonContainer: {
        marginRight: '22px'
    }
})

export default useStyles


