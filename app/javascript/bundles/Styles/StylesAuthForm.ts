import {makeStyles} from "@mui/styles";
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
        alignSelf: 'center  ',
        minWidth: '225px',
        '&:hover': {
            background: props.secondaryColor,
        }
    }),

    continueButton: {
        backgroundColor: '#fcba03',
        minWidth: '225px',
        fontWeight: 'bold'
    },

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
            minWidth: 'calc(90vw - 2rem)',
        },
        [`@media (max-width: ${Breakpoints.mobile})`]: {
            minWidth: 'calc(100vw - 2rem)',
        },
        [`@media (max-width: ${Breakpoints.xsMobile})`]: {
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
                // borderBottom: `.1rem solid ${Colors.deepGrey}`
            },
            '&:after': {
                // borderBottom: `.1rem solid ${props.dominantColor}`
            }
        },
        [`@media(max-width: ${Breakpoints.mobile})`]: {
            marginBottom: '1rem',
        }

    }),

    noAccountContainer: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'space-between'
    },

    noAccountButtonsContainer: {
        display: 'flex',
        justifyContent: 'center'
    },

    continueAsGuest: {
        fontSize: '1.9rem',
        [`@media(max-width: ${Breakpoints.xsMobile})`]: {
            fontSize: '1rem'
        }
    },

    guestLabel: {
        marginBottom: '1rem'
    },

    or: {
        margin: '1rem 0'
    }
})
