import * as React from 'react';
import {FunctionComponent} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import SignupScreen from "../../Signup/components/SignupScreen";
import Layout from './Layout';
import {Theme} from '../../state/ThemeContext';
import ThemeContext from '../../state/ThemeProvider';
import ThemeProvider from "../../state/ThemeProvider";

export interface Props {
    // Todo, maybe not needed
}

const globalState = {
    darkMode: true
}

const GlobalStateContext = React.createContext(globalState)
// Use a Provider to pass the current theme to the tree below.
// Any component can read it, no matter how deep it is.
const App: FunctionComponent<Props> = (props) => {
    const [theme, setTheme] = React.useState(Theme.Light);
    return (
        // This is the global state "Provider" to ALL components in the tree
        <ThemeProvider>
            <BrowserRouter>
                <Switch>
                    <Layout>
                        <Route exact path="/signup" component={SignupScreen}/>
                    </Layout>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export {App, GlobalStateContext};