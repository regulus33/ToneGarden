import {makeStyles} from "@mui/styles";
import Breakpoints from "./Breakpoints";

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: '13px',
        [`@media(min-width: ${Breakpoints.smallDesktop})`]: {
        }
    },
});

export default useStyles
