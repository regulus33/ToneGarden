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
   presetFormCard: {
       padding: '32px 16px',
       maxHeight: 'calc(100vh - 300px)',
       minWidth: '500px',
       margin: '0 auto',
       [`@media (max-width: ${Breakpoints.mobile})`]: {
           minWidth: 0,
           width: 'calc(100vw - 32px)'
       }
    },
    pitchSliderContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    audioControlsContainer: {
       marginTop: '32px',
       display: 'flex',
        justifyContent: 'space-between',
        '& svg': {
            transform: 'scale(130%)',
            // color: Colors.defaultBlue
        }
    },
    saveButtonContainer: {
       marginRight: '22px'
    }
})

export default useStyles


