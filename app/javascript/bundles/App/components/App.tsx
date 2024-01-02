import * as React from 'react';
import {FunctionComponent} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import SignupScreen from "../../Signup/components/SignupScreen";
import Layout from './Layout';

export interface Props {
    // Todo, maybe not needed
}

import { ThemeContext, Theme} from "../../state/ThemeContext";



const App: FunctionComponent<Props> = (props) => {
    const [theme, setTheme] = React.useState(Theme.Light);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <BrowserRouter>
                <Switch>
                    <Layout>
                        <Route exact path="/signup" component={SignupScreen}/>
                    </Layout>
                </Switch>
            </BrowserRouter>
        </ThemeContext.Provider>
    );
}

export {App};