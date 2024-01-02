import * as React from 'react';
import {FunctionComponent, ReactNode} from 'react';
import {classList} from "../../Helpers/ViewHelper";
import {Theme, useTheme} from '../../state/ThemeContext';

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
        if (event.code == 'Digit0') {
            switch (theme) {
               case  Theme.Dark:
                    setTheme(Theme.Light);
                    break;
                case Theme.Light:
                    setTheme(Theme.Dark);
                    break;
                default:
                    throw('Unknown Theme type in theme state!')
            }
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