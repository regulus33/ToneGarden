import * as React from 'react';
import {FunctionComponent, useState} from 'react'
import ContentWrapper from "../App/components/ContentWrapper";
import AuthForm from "../SharedComponents/AuthForm";
import NetworkService from "../Network/NetworkService";
import SecureStorageService from "../Network/SecureStorageService";
import Routes from "../Network/Routes";
import { useHistory } from 'react-router-dom'
import {useStyles} from "../Styles/StylesSignupScreen";
import {useGradient} from "../State/GradientContext";
import {useError} from "../State/ErrorContext";

const SignupScreen: FunctionComponent<SignupScreenProps> = (props) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const { error } = useError()
    const classes = useStyles()
    const history = useHistory()

    const {gradient} = useGradient()

    const onEmailChange = (event) => {
        let emailText = event.target.value
        setEmail(emailText)
    }
    const onPasswordChange = (event) => {
        let passwordText = event.target.value
        setPassword(passwordText)
    }

    const onSubmit = async (event: any) => {
        const response = await NetworkService.getInstance().post(
            Routes.Login,
            { user: { email, password } }
        );
        if(response.ok) {
            await SecureStorageService.setToken(response.token)
            history.push('/presets')
        }
    }

    return (
        <div className={classes.authFormContainer}>
            <AuthForm buttonText={'Continue'} heading={'Signin'} gradient={gradient} error={error} onSubmit={onSubmit} onEmailChange={onEmailChange} onPasswordChange={onPasswordChange}/>
        </div>
    );
}



interface SignupScreenProps {
// buttonText: string;
}

export default SignupScreen