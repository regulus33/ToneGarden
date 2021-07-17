import * as React from "react"
import {FunctionComponent} from "react"
import Snackbar from '@material-ui/core/Snackbar';
import FlashMessage, {FlashEnum} from "../Models/FlashMessage";
import MuiAlert from "@material-ui/lab/Alert";
import {useFlashMessage} from "../State/FlashMessageContext";
import {makeStyles} from "@material-ui/styles";

interface Props {
    flashMessage: FlashMessage,
}

const useStyles = makeStyles(
    {
        root: {
            bottom: '90px'
        }
    }
)

const Flash: FunctionComponent<Props> = (props) => {
    const { setFlashMessage } = useFlashMessage()
    const { flashMessage } = props
    const classes  = useStyles()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setFlashMessage(new FlashMessage(flashMessage.text, false, flashMessage.type))
    }

        return(
            <Snackbar className={classes.root} open={ flashMessage.visible } onClose={ handleClose } autoHideDuration={ 3000 }>
                <MuiAlert elevation={6} variant='filled' onClose={ handleClose } severity={ flashMessage.type }>
                    { flashMessage.text }
                </MuiAlert>
            </Snackbar>
    )
}

export default Flash