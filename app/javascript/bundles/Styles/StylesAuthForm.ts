import {makeStyles} from "@material-ui/core";
import Breakpoints from "./Breakpoints";
import Colors from "./Colors";

interface Props {
    dominantColor: string,
    secondaryColor: string,
}

export const useStyles = makeStyles({
    submitButton: (props: Props) => ({
        backgroundColor: props.dominantColor,
        color: 'white',
        maxWidth: '7rem',
        alignSelf: 'flex-end',
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
            maxWidth: '3rem',
            alignSelf: 'flex-end'
        },
            [`@media (max-width: ${Breakpoints.smallDesktop})`]: {
            minWidth: 'calc(100vw - 5rem)',
        },
        [`@media (max-width: ${Breakpoints.tablet})`]: {
            minWidth: 'calc(100vw - 2rem)',
        },
        [`@media (max-width: ${Breakpoints.mobile})`]: {
            minWidth: 'calc(100vw - 2rem)',
        },

    },
    heading: {
        marginBottom: '.9rem',
        fontWeight: 'bold'
    },
    paper: {
        height: 'fit-content',
        padding: '2.5rem 2rem'
    },
    textField: (props: Props) => ({
        '& div': {
            '&:before': {
                borderBottom: `.1rem solid ${Colors.deepGrey}`
            },
            '&:after': {
                borderBottom: `.1rem solid ${props.dominantColor}`
            }
        }
    }),
    noAccountContainer: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '50%'
    },
    noAccountButtonsContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    continueAsGuest: {
        fontSize: '1.9rem'
    }
})