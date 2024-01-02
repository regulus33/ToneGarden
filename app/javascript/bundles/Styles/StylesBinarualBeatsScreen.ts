import {makeStyles} from "@material-ui/styles";
import Breakpoints from "./Breakpoints";


const useStyles = makeStyles({
    root: {
        padding: '9 0px 0',
        [`@media(max-width: ${Breakpoints.tablet}`]: {
            padding: '50px 0'
        }
    }
})

export default useStyles