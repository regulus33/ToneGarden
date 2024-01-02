import {makeStyles} from "@material-ui/core";
import Colors from "../Styles/Colors";

const useStyles = makeStyles({
   presetFormCard: {
        maxHeight: 'calc(100vh - 500px)',
       minWidth: 'calc(100vw - 128px * 2)',
       margin: '0 auto'
    },
    pitchSliderContainer: {
       padding: '0px 32px'
    }
})

export default useStyles