import {makeStyles} from "@mui/styles";
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
        marginBottom: '5rem',
        [`@media (max-width: ${Breakpoints.mobile})`]: {
            minWidth: '100%',
            width: '100vw',
            marginTop: '3rem',
            marginBottom: '3rem'
            // width: 'calc(100vw - 3rem)'
        }
    },
    pitchSliderContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '1.7rem .6rem',
        [`@media (min-width: ${Breakpoints.mobile})`]: {
            '& form': {
                // maxWidth: 'calc(100% - 19.7rem)'
            }
        }
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
    },
    canvasContainer: {
        padding: '0 .7rem',
        position: 'relative',
        height: '22vh',
        '& > canvas': {
            height: '22vh',
            width: 'calc(100% - 24px)',
            position: 'absolute',
            top: 0,
            left: 0,
            padding: '1.57em'
        }
    }
})

export default useStyles
