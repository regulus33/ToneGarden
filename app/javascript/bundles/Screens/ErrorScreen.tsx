import * as React from 'react'
import {FunctionComponent} from "react"
import {Button} from "@material-ui/core"
import useStyles from "../Styles/StylesErrorScreen"
import {useHistory} from 'react-router-dom'

interface ErrorScreenProps {
    errorMessage?: string
}

const ErrorScreen: FunctionComponent<ErrorScreenProps> = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const onButtonClick = () => {
        history.goBack()
    }
    return(
        <div className={classes.root}>

            <h1>{ props.errorMessage || 'Oops! It looks like our app is having a hiccup. Try refreshing or restarting. We will fix it asap.' }</h1>
            <Button onClick={onButtonClick} variant={'contained'} color={'primary'}>Go back</Button>
        </div>
    )
}

export default ErrorScreen


