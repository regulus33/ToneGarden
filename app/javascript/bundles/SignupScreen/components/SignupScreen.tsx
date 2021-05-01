import * as React from 'react';
import {FunctionComponent, useState} from 'react'
import ContentWrapper from "../../App/components/ContentWrapper";
import AuthForm from "../../SharedComponents/AuthForm";
import NetworkService from "../../Network/NetworkService";
import SecureStorageService from "../../Network/SecureStorageService";
import Routes from "../../Network/Routes";
import { useHistory } from 'react-router-dom'
import {useStyles} from "../../Styles/StylesSignupScreen";
import {useGradient} from "../../State/GradientContext";
const SignupScreen: FunctionComponent<SignupScreenProps> = (props) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const classes = useStyles()
    const history = useHistory()

    const {gradient} = useGradient();


    const onEmailChange = (event) => {
        let emailText = event.target.value
        setEmail(emailText)
    }
    const onPasswordChange = (event) => {
        let passwordText = event.target.value
        setPassword(passwordText)
    }

    const onSubmit = async () => {
        const response = await NetworkService.getInstance().post(
            Routes.NewUser,
            { user: { email, password } }
        );
        SecureStorageService.setToken(response.token);
        history.push('/presets')
    }

    return (
        <div className={classes.authFormContainer}>
            <AuthForm gradient={gradient} onSubmit={onSubmit} onEmailChange={onEmailChange} onPasswordChange={onPasswordChange}/>
        </div>
);
}



interface SignupScreenProps {
// buttonText: string;
}

export default SignupScreen