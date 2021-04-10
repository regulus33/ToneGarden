import * as React from 'react';
import {FunctionComponent} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import SignupScreen from "../../SignupScreen/components/SignupScreen";
import PresetsScreen from "../../PresetsScreen/components/PresetsScreen";
import PresetShowScreen from "../../PresetShowScreen/components/PresetShowScreen";
import Layout from './Layout';
import { makeStyles } from '@material-ui/core/styles';

// TODO: did material add this automatically? How am I supposed to use?
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export interface Props {
    match: any
}

import { ThemeContext, Theme} from "../../State/ThemeContext";



const App: FunctionComponent<Props> = (props) => {
    const [theme, setTheme] = React.useState(Theme.Light);
    const { match } = props;
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <BrowserRouter>
                <Switch>
                    <Layout>
                        <Route exact path="/signup" component={SignupScreen} title="Signup"/>
                        <Route exact path="/presets" component={PresetsScreen} title="Presets"/>
                        <Route exact path="/preset_show/:preset_id" component={PresetShowScreen} title="Preset Show"/>
                    </Layout>
                </Switch>
            </BrowserRouter>
        </ThemeContext.Provider>
    );
}

export {App};