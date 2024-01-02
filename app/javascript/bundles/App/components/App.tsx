import * as React from 'react';
import {FunctionComponent, useEffect, useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import SignupScreen from "../../SignupScreen/components/SignupScreen";
import PresetsScreen from "../../PresetsScreen/components/PresetsScreen";
import PresetShowScreen from "../../PresetShowScreen/components/PresetShowScreen";
import Layout from './Layout';
import {ThemeContext, Theme} from "../../State/ThemeContext";
import {GradientContext} from "../../State/GradientContext";
import {AuthContext} from "../../State/AuthContext";
import {ErrorContext} from "../../State/ErrorContext";
import Gradient from '../../Models/Gradient';
import {TitleContext} from "../../State/TitleContext";
import BinauralBeat from "../../Models/BinauralBeat";
import {BinauralBeatContext} from "../../State/BinauralBeatContext";
import NetworkService from "../../Network/NetworkService";
import AuthenticatedRoute from "./AuthenticatedRoute"
import SecureStorageService from "../../Network/SecureStorageService";
import SettingsScreen from "../../SettingsScreen/components/SettingsScreen";
import ProgressWheel from "../../SharedComponents/ProgressWheel";

const App: FunctionComponent = () => {
    const [authenticated, setAuthenticated] = React.useState(false);
    const [theme, setTheme] = React.useState(Theme.Light);
    const [title, setTitle] = React.useState('Binaural Beats');
    const [gradient, setGradient] = React.useState(new Gradient('alpha'));
    const [binauralBeat, setBinauralBeat] = React.useState(BinauralBeat.getInstance);
    const [error, setError] = React.useState(null)

    NetworkService.getInstance().setAuthenticated = setAuthenticated
    NetworkService.getInstance().setError = setError

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setAuthenticated(SecureStorageService.getIsAuth())
        setLoaded(true)
    }, [])

    if (loaded) {
        return (
            <ErrorContext.Provider value={{error, setError}}>
                <AuthContext.Provider value={{authenticated, setAuthenticated}}>
                    <ThemeContext.Provider value={{theme, setTheme}}>
                        <TitleContext.Provider value={{title, setTitle}}>
                            <GradientContext.Provider value={{gradient, setGradient}}>
                                <BinauralBeatContext.Provider value={{binauralBeat, setBinauralBeat}}>
                                    <BrowserRouter>
                                        <Switch>
                                            <Layout>
                                                <Route exact path="/signup" component={SignupScreen} title="Signup"/>
                                                <AuthenticatedRoute path="/presets" component={PresetsScreen}
                                                                    title="Presets"/>
                                                <AuthenticatedRoute path="/preset_show/:preset_id"
                                                                    component={PresetShowScreen}
                                                                    title="Preset Show"/>
                                                <AuthenticatedRoute path="/settings"
                                                                    component={SettingsScreen}
                                                                    title="Settings"/>
                                            </Layout>
                                        </Switch>
                                    </BrowserRouter>
                                </BinauralBeatContext.Provider>
                            </GradientContext.Provider>
                        </TitleContext.Provider>
                    </ThemeContext.Provider>
                </AuthContext.Provider>
            </ErrorContext.Provider>
        );
    } else {
        return (
            <ProgressWheel/>
        )
    }
}

export
{
    App
}
    ;