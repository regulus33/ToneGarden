import * as React from 'react';
import {FunctionComponent, ReactChildren, ReactNode} from 'react';
import {classList} from "../../Helpers/ViewHelper";
import { useTheme, Theme } from '../../state/ThemeContext';

// using an interface to describe the requirement of having the x property that is a y type
export interface Props {
    // property: string
    // optionalProperty?:bigint
}

interface ContentProps {
    title?: string,
    children: ReactNode
}


const Content: FunctionComponent<ContentProps> = (props) => {
    const { theme, setTheme } = useTheme();

    function handleInputKeyUp(event: any): void {
        alert('dddd')
        if (event.code == '48') {
            setTheme(Theme.Dark)
        }
    }

    return (
        <div onKeyPress={ handleInputKeyUp } tabIndex={0}
             className={classList(['container'], theme)}>
            <h1>Hello</h1>
            {props.children}
        </div>
    )
}
// https://www.basefactor.com/global-state-with-react
const Layout: FunctionComponent<Props> = (props) => {
    return (
        <Content children={props.children} title={'Title'}/>
    );
}
export default Layout;