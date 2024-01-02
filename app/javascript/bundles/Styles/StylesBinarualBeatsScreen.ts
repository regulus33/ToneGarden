import {makeStyles} from "@mui/styles";
import Breakpoints from "./Breakpoints";


const useStyles = makeStyles({
    root: {
        padding: '90px 0',
        [`@media(max-width: ${Breakpoints.tablet})`]: {
            padding: '80px 0'
        }
    }
})

export default useStyles