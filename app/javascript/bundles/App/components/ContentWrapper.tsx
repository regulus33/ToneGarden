import * as React from "react";
import {FunctionComponent} from 'react'

interface Props {
    children: any,
}

const ContentWrapper: FunctionComponent<Props> = (props) => {

    return (
            <div className={'content-wrapper'}>
                {props.children}
            </div>
    );
}

export default ContentWrapper;


