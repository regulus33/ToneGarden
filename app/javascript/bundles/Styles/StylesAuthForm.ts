import {makeStyles} from "@material-ui/core";
import Breakpoints from "./Breakpoints";

interface Props {
    dominantColor: string,
    secondaryColor: string,
}

export const useStyles = makeStyles({
    submitButton: (props: Props) => ({
        backgroundColor: props.dominantColor,
        color: 'white',
        '&:hover': {
            background: props.secondaryColor,
        }
    }),
    authform: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 'calc(100vh/4)',
        minWidth: 'calc(100vw/2.5)',
        '& a': {
            maxWidth: '100px',
            alignSelf: 'flex-end'
        },
            [`@media (max-width: ${Breakpoints.smallDesktop})`]: {
            minWidth: 'calc(100vw - 400px)',
        },
        [`@media (max-width: ${Breakpoints.tablet})`]: {
            minWidth: 'calc(100vw - 64px)',
        },
        [`@media (max-width: ${Breakpoints.mobile})`]: {
            minWidth: 'calc(100vw - 32px)',
        },

    },
    heading: {
        marginBottom: '16px'
    },
    paper: {
        height: 'fit-content',
        padding: '24px 16px'
    }
})