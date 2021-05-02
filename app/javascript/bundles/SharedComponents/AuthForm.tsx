import * as React from 'react';
import {FormEvent, FunctionComponent} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useStyles} from "../Styles/StylesAuthForm";
import {Paper, Typography} from "@material-ui/core";
import Gradient from "../Models/Gradient";
import GlobalError from "../Models/GlobalError";

interface AuthFormProps {
    onEmailChange(event: FormEvent<HTMLInputElement>): void,
    onPasswordChange(event: FormEvent<HTMLInputElement>): void,
    onSubmit(any): void,
    gradient: Gradient,
    error?: GlobalError
}

const AuthForm: FunctionComponent<AuthFormProps> = ({onEmailChange, onPasswordChange, onSubmit, gradient, error}) => {
    const classes = useStyles(gradient.toProps());

    return (
        <Paper className={classes.paper}>
            <div>
                <Typography className={classes.heading} variant='h5'>Signup</Typography>
                <form className={classes.authform}>
                    <TextField error={(error!=null)}
                               label={(error != null) ? error.message : 'Email'}
                               onInput={onEmailChange}
                               variant='standard'
                               type={'email'}
                               className={classes.textField}
                               placeholder='example@example.com'/>
                    <TextField label='Password'
                               onInput={onPasswordChange}
                               variant='standard'
                               className={classes.textField}
                               type={'password'}/>
                    <Button onClick={onSubmit} className={classes.submitButton} variant="contained" color="primary">Submit</Button>
                </form>
            </div>
        </Paper>
    );
}

export default AuthForm