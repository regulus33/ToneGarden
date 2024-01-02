import * as React from 'react';
import {FunctionComponent} from 'react'
import {Button} from '@mui/material';
import useStyles from "../Styles/StylesCallToAction";

interface Props {
    onCTAClick(event: any): void,
    buttonText: String
}

const CallToAction: FunctionComponent<Props> = ({ onCTAClick, buttonText }) => {
    const classes = useStyles()

    return(
        <Button onClick={onCTAClick} className={classes.root} variant="contained" color="primary">{buttonText}</Button>
    )
}

export default CallToAction
