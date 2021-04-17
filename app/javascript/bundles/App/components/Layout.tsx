import * as React from 'react';
import {FunctionComponent, ReactNode} from 'react';
import {Theme, useTheme} from '../../State/ThemeContext';
import { useTitle } from '../../State/TitleContext';
import Header from '../../SharedComponents/Header';
import Footer from '../../SharedComponents/Footer';
import useStyles from "../../Styles/StylesLayout";
import {useGradient} from "../../State/GradientContext";
export interface Props {
}

interface ContentProps {
    title?: string,
    children: ReactNode
}

// Private
const Content: FunctionComponent<ContentProps> = (props) => {
    const {theme, setTheme} = useTheme();
    const { title } = useTitle();
    const { gradient } = useGradient();
    const classes = useStyles();
    // TODO: DARK MODE
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
                    throw('Unknown Theme type in theme State!')
            }
        }
    }

    return (
        <div onKeyPress={handleInputKeyUp} tabIndex={0} className={classes.mainContainer}>
            <Header screen={title} gradient={gradient}/>
           <div className={classes.contentContainer}>
            {
                props.children
            }
           </div>
            <Footer/>
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