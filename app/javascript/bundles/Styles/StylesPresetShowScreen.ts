import {makeStyles} from "@mui/styles";
import Breakpoints from "./Breakpoints";
import {BOTTOM_BAR_HEIGHT, NAVBAR_HEIGHT} from "../Models/Constants";
import Colors from "./Colors";
import {Theme} from "../State/ThemeContext";

interface Props {
  dominantColor: string,
  secondaryColor: string,
  theme: Theme
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
  editCardContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: NAVBAR_HEIGHT,
    paddingBottom: BOTTOM_BAR_HEIGHT,
  },
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
    margin: '0 auto',
    width: `660px`,
    [`@media (max-width: ${Breakpoints.mobile})`]: {
      minWidth: '100%',
      width: '100vw',
      // marginTop: '1rem',
      // marginBottom: '3rem'
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
  canvasContainer: (props: Props) => ({
    margin: '0.7rem',
    padding: '0 .7rem',
    position: 'relative',
    height: '22vh',
    '& > canvas': {
      backgroundColor: (props.theme === Theme.Dark ? Colors.backgroundGreyDark : Colors.backgroundGrey),
      height: '22vh',
      borderRadius: '9px',
      width: 'calc(100% - 24px)',
      position: 'absolute',
      top: 0,
      left: 0,
      padding: '.5rem'
    }
  })
})

export default useStyles
