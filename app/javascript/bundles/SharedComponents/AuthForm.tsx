import * as React from 'react';
import {FormEvent, FunctionComponent} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useStyles} from "../Styles/StylesAuthForm";
import {Paper, Typography} from "@material-ui/core";
import {useGradient} from "../State/GradientContext";
import Gradient from "../Models/Gradient";

interface AuthFormProps {
    onEmailChange(event: FormEvent<HTMLInputElement>): void,
    onPasswordChange(event: FormEvent<HTMLInputElement>): void,
    onSubmit(event: FormEvent<HTMLFormElement>): void,
    gradient: Gradient

}

const AuthForm: FunctionComponent<AuthFormProps> = ({onEmailChange, onPasswordChange, onSubmit, gradient}) => {
    const classes = useStyles(gradient.toProps());

    return (
        <Paper className={classes.paper}>
            <div>
                <Typography className={classes.heading} variant='h5'>Signup</Typography>
                <form className={classes.authform} onSubmit={onSubmit}>
                    <TextField label='Email'
                               onInput={onEmailChange}
                               variant='outlined'
                               type={'email'}
                               placeholder='example@example.com'/>
                    <TextField label='Password'
                               onInput={onPasswordChange}
                               variant='outlined'
                               type={'password'}/>
                    <Button className={classes.submitButton} type="submit" variant="contained" color="primary" href="#contained-buttons">Submit</Button>
                </form>
            </div>
        </Paper>
    );
}

export default AuthForm