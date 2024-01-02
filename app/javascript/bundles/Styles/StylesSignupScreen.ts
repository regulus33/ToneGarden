import {makeStyles} from "@mui/styles";
import Breakpoints from "./Breakpoints";

export const useStyles = makeStyles({
    authFormContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '7rem',
        [`@media(max-width:${Breakpoints.xsMobile})`]: {
            marginTop: '8rem'
        }
    },

    authFormContainerWrapper:{
        display: 'flex',
        alignItems: 'center',
        height: '100vh'
    }
})