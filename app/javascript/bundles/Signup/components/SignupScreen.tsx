import * as React from 'react';
import {FunctionComponent} from 'react'
import {classList} from "../../Helpers/ViewHelper";
import {useTheme} from '../../state/ThemeContext';
import ContentWrapper from "../../App/components/ContentWrapper";
import AuthForm from "../../Shared/components/AuthForm";

interface SignupScreenProps {
// buttonText: string;
}


const SignupScreen: FunctionComponent<SignupScreenProps> = (props) => {
    const {theme} = useTheme();
    return (
        <ContentWrapper theme={theme}>
            <div className={classList(['form-container'], theme)}>
                <AuthForm/>
            </div>
        </ContentWrapper>
    );
}

export default SignupScreen