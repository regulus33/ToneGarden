import {makeStyles} from "@mui/styles";
import {FEATURE_GRAPH_BACKGROUND} from "../Models/Constants";
import Breakpoints from "./Breakpoints";

const useStyles = makeStyles({
    container: {
        backgroundColor: FEATURE_GRAPH_BACKGROUND,
        position: 'relative',
        height: '100vh'
    },
    hero: {
        marginTop: 56,
        width: '100%',
        height: '100%',
        [`@media(min-width: ${Breakpoints.largeDesktop})`]: {
            height: '90vh',
        },

    },
    cta: {
        position: 'absolute',
        bottom: '105px',
        right: '50%',
        zIndex: 9999,
        transform: 'translateX(50%)',
        [`@media(min-width: ${Breakpoints.smallDesktop})`]: {
            bottom: '64px',
        },
        [`@media(max-width: ${Breakpoints.mobile})`]: {
            top: '15%'
        }
    }
})

export default useStyles