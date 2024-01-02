import * as React from 'react';
import {FunctionComponent} from 'react'
import {classList} from "../../Helpers/ViewHelper";

interface TextFieldProps {
    placeholder: string,
    id: string,
    classList: string,
    theme: string,
}

const SignupScreen: FunctionComponent<TextFieldProps> = (props) => {
    return (
        <input type="text" className={classList(['text-input'], props.theme)}/>
    );
}

export default SignupScreen