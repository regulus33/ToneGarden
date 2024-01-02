import {makeStyles} from "@mui/styles";
import Colors from "../Styles/Colors";
import Breakpoints from "./Breakpoints";

const useStyles = makeStyles({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        // backgroundColor: Colors.backgroundGrey,
        height: `100%`,
        width: `100%`
    },
    contentContainer: {
        // display: 'flex',
        // flexGrow: 1,
        // [`@media (max-width: ${Breakpoints.mobile})`]: {
            // padding: 0,
            // width: '100vw'
        // },
        // padding: '2.28rem',
        // position: 'relative'
    }
})

export default useStyles