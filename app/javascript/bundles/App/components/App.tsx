import * as React from 'react';
import {FunctionComponent} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import SignupScreen from "../../SignupScreen/components/SignupScreen";
import PresetsScreen from "../../PresetsScreen/components/PresetsScreen";
import PresetShowScreen from "../../PresetShowScreen/components/PresetShowScreen";
import Layout from './Layout';
import {ThemeContext, Theme} from "../../State/ThemeContext";
import {GradientContext} from "../../State/GradientContext";
import Gradient from '../../Models/Gradient';
import {TitleContext} from "../../State/TitleContext";
import BinauralBeat from "../../Models/BinauralBeat";
import {BinauralBeatContext} from "../../State/BinauralBeatContext";

export interface Props {
    match: any
}

const App: FunctionComponent<Props> = (props) => {
    const [theme, setTheme] = React.useState(Theme.Light);
    const [title, setTitle] = React.useState('Binaural Beats');
    const [gradient, setGradient] = React.useState( new Gradient('alpha'));
    const [binauralBeat, setBinauralBeat] = React.useState(BinauralBeat.getInstance);
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <TitleContext.Provider value={{title, setTitle}}>
                <GradientContext.Provider value={{gradient, setGradient}}>
                <BinauralBeatContext.Provider value={{binauralBeat, setBinauralBeat}}>
                    <BrowserRouter>
                        <Switch>
                            <Layout>
                                <Route exact path="/signup" component={SignupScreen} title="Signup"/>
                                <Route exact path="/presets" component={PresetsScreen} title="Presets"/>
                                <Route exact path="/preset_show/:preset_id" component={PresetShowScreen}
                                       title="Preset Show"/>
                            </Layout>
                        </Switch>
                    </BrowserRouter>
                </BinauralBeatContext.Provider>
                </GradientContext.Provider>
            </TitleContext.Provider>
        </ThemeContext.Provider>
);
}

export
    {
        App
    }
;