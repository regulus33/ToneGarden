import * as React from 'react';
import { FunctionComponent } from 'react'
import { classList } from "../../Helpers/ViewHelper";
import { useTheme, Theme } from '../../state/ThemeContext';

interface SignupScreenProps {
// buttonText: string;
}

interface ContentProps {
    darkMode: boolean
}

const SignupScreen: FunctionComponent<SignupScreenProps> = ( props ) => {
    const { theme } = useTheme();
    return(
        <div className={'paget-container'}>
            <a>darkMode toggle</a>
            <h1 className={classList(['page-title'], theme)}>Signup</h1>
        </div>
    );
}

export default SignupScreen