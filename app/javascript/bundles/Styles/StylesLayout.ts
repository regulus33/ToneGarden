import {makeStyles} from "@material-ui/core";
import Colors from "../Styles/Colors";

const useStyles = makeStyles({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Colors.backgroundGrey,
        minHeight: '100vh'
    },
    contentContainer: {
        display: 'flex',
        flexGrow: 1,
        padding: '2.28rem'
    }
})

export default useStyles