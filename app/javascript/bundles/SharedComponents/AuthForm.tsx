import * as React from 'react';
import {FormEvent, FunctionComponent} from 'react'
import {TextField} from '@mui/material';
import {Button} from '@mui/material';
import {useStyles} from "../Styles/StylesAuthForm";
import {Paper, Typography} from "@mui/material";
import Gradient from "../Models/Gradient";
import GlobalError from "../Models/GlobalError";
import {useHistory} from "react-router-dom"
import Routes from "../Network/Routes";
import {Link} from "react-router-dom";
import {Divider} from "@mui/material";

interface AuthFormProps {
    onEmailChange(event: FormEvent<HTMLInputElement>): void,
    onPasswordChange(event: FormEvent<HTMLInputElement>): void,
    onSubmit(any): void,

    buttonText: string,
    heading: string
    gradient: Gradient,
    error?: GlobalError,
    optionalLinkText?: string,
    optionalLink?: string,
    guestText?: string,
}

const AuthForm: FunctionComponent<AuthFormProps> = ({
                                                        onEmailChange,
                                                        onPasswordChange,
                                                        onSubmit,
                                                        heading,
                                                        buttonText,
                                                        gradient,
                                                        error,
                                                        optionalLinkText,
                                                        optionalLink,
                                                        guestText
                                                    }) => {
    const classes = useStyles(gradient.toProps())
    const history = useHistory()

    const createGuest = () => {
        history.replace(Routes.GuestTokenScreen)
    }

    const optionalLinkRender = () => {
        if (optionalLinkText)
            return (
                <div>
                    <Divider className={classes.or} variant={'middle'}/>
                    <Link to={optionalLink}>{optionalLinkText}</Link>
                    <Divider className={classes.or} variant={'middle'}/>
                </div>
            )
    }

    return (
        <Paper elevation={0} className={classes.paper}>
            <div>
                <Typography className={classes.heading} variant='h5'>{heading}</Typography>
                <form className={classes.authform}>
                    <TextField error={(error != null)}
                               label={(error != null) ? error.message : 'Email'}
                               onInput={onEmailChange}
                               variant='outlined'
                               type={'email'}
                               className={classes.textField}
                               placeholder='example@example.com'/>
                    <TextField label='Password'
                               onInput={onPasswordChange}
                               variant='outlined'
                               className={classes.textField}
                               type={'password'}/>
                    <Button onClick={onSubmit} className={classes.submitButton} variant="contained"
                            color="primary">{buttonText}</Button>
                </form>
            </div>
            <div className={classes.noAccountContainer}>
                {optionalLinkRender()}
                <div className={classes.noAccountButtonsContainer}>
                    <Button variant='contained' className={classes.continueButton} onClick={createGuest}>{guestText}</Button>
                </div>
            </div>
        </Paper>
    );
}

export default AuthForm
