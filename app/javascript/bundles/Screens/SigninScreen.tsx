import * as React from 'react';
import {FunctionComponent, useState} from 'react'
import AuthForm from "../SharedComponents/AuthForm"
import NetworkService from "../Network/NetworkService"
import LocalStorageService from "../Network/LocalStorageService"
import Routes from "../Network/Routes"
import {useHistory} from 'react-router-dom'
import {useStyles} from "../Styles/StylesSignupScreen"
import {useGradient} from "../State/GradientContext"
import {useError} from "../State/ErrorContext"

const SigninScreen: FunctionComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {error} = useError()
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
            {user: {email, password}}
        )

        if (response) {
            // @ts-ignore
            LocalStorageService.setToken(response.data.token)
            history.push('/presets')
        }
    }

    return (
        <div className={classes.authFormContainerWrapper}>
            <div className={classes.authFormContainer}>
                <AuthForm guestText={'Continue as guest'}
                          optionalLink={Routes.SignupScreen}
                          optionalLinkText={'Create a new account'}
                          buttonText={'Sign in'}
                          heading={'Sign in'}
                          gradient={gradient}
                          error={error}
                          onSubmit={onSubmit}
                          onEmailChange={onEmailChange}
                          onPasswordChange={onPasswordChange}
                />
            </div>
        </div>
    );
}

export default SigninScreen
