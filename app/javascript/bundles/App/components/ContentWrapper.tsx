import {classList} from "../../Helpers/ViewHelper";
import * as React from "react";
import {FunctionComponent} from 'react'

interface Props {
    children: any,
    theme: String,
}

const ContentWrapper: FunctionComponent<Props> = (props) => {

    return (
        <div className={'page-container'}>
            <nav className={classList(['nav'], props.theme)}>
                <span className={classList(['page-title'], props.theme)}>Signup</span>
            </nav>
            <div className={classList(["content-container"], props.theme)}>
                {props.children}
            </div>
        </div>
    );
}

export default ContentWrapper;


