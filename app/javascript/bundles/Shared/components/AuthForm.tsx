import * as React from 'react';
import {FunctionComponent} from 'react'
import {classList} from "../../Helpers/ViewHelper";
import {useTheme} from '../../state/ThemeContext';
import TextField from "./TextField";

interface AuthFormProps {
}

const AuthForm: FunctionComponent<AuthFormProps> = (props) => {
    const { theme } = useTheme();
    return (
        <div className={classList(['auth-form'], theme)}>
            <TextField placeholder={'johndoe@internet.com'} id={'email'}/>
        </div>
    );
}

export default AuthForm