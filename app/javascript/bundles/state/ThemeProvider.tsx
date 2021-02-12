import * as React from 'react';
import { ThemeContext, Theme } from './ThemeContext';
import {FunctionComponent} from "react";

interface ThemeProps {
    children: any
}
const ThemeProvider: FunctionComponent<ThemeProps> = (props) => {
    const [theme, setTheme] = React.useState(Theme.Light);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { props.children }
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;