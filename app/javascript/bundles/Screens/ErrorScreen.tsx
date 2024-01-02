import * as React from 'react'
import {FunctionComponent} from "react"
import {Button} from "@material-ui/core"

interface ErrorScreenProps {
    errorMessage?: string
}

const ErrorScreen: FunctionComponent<ErrorScreenProps> = (props) => {
    return(
        <div>
            <h1>Oops! An error occured!</h1>
            <Button variant={'outlined'}>Go back</Button>
        </div>
    )
}

export default ErrorScreen


