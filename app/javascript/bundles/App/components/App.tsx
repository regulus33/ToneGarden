import * as React from 'react'
import {FunctionComponent, useEffect, useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import SignupScreen from "../../Screens/SignupScreen"
import BinauralBeatsScreen from "../../Screens/BinauralBeatsScreen"
import BinauralBeatEditScreen from "../../Screens/BinauralBeatEditScreen"
import Layout from './Layout'
import {ThemeContext, Theme} from "../../State/ThemeContext"
import {GradientContext} from "../../State/GradientContext"
import {AuthContext} from "../../State/AuthContext"
import {ErrorContext} from "../../State/ErrorContext"
import Gradient from '../../Models/Gradient'
import {TitleContext} from "../../State/TitleContext"
import BinauralBeat from "../../Models/BinauralBeat"
import {BinauralBeatContext, defaultBinauralBeatState} from "../../State/BinauralBeatContext"
import {SettingsDrawerContext} from "../../State/SettingsDrawerContext"
import NetworkService from "../../Network/NetworkService"
import AuthenticatedRoute from "./AuthenticatedRoute"
import SecureStorageService from "../../Network/SecureStorageService"
import ProgressWheel from "../../SharedComponents/ProgressWheel"
import DrawerState from "../../Models/DrawerState";
import SigninScreen from "../../Screens/SigninScreen";
import GuestTokenScreen from "../../Screens/GuestTokenScreen";

const App: FunctionComponent = () => {
    const [authenticated, setAuthenticated] = React.useState(false)
    const [theme, setTheme] = React.useState(Theme.Light)
    const [title, setTitle] = React.useState('Binaural Beats')
    const [gradient, setGradient] = React.useState(new Gradient('alpha'))
    const [binauralBeatState, setBinauralBeatState] = React.useState(defaultBinauralBeatState())
    const [error, setError] = React.useState(null)

    // TODO: we should use Anchor or remove it.
    const [drawerState, setDrawerState] = React.useState(new DrawerState(false, 'left' ))

    // Pass Dispatches to Singletons
    NetworkService.getInstance().setAuthenticated = setAuthenticated
    NetworkService.getInstance().setError = setError

    BinauralBeat.getInstance().setBinauralBeatState = setBinauralBeatState
    BinauralBeat.getInstance().setGradient = setGradient
    BinauralBeat.getInstance().setTitle = setTitle

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setAuthenticated(SecureStorageService.getIsAuth())
        setLoaded(true)
    }, [])

    if (loaded) {
        return (
            <ErrorContext.Provider value={{error, setError}}>
                <AuthContext.Provider value={{authenticated, setAuthenticated}}>
                    <ThemeContext.Provider value={{theme, setTheme}}>
                        <SettingsDrawerContext.Provider value={{drawerState, setDrawerState}}>
                            <TitleContext.Provider value={{title, setTitle}}>
                                <GradientContext.Provider value={{gradient, setGradient}}>
                                    <BinauralBeatContext.Provider value={{binauralBeatState, setBinauralBeatState}}>
                                        <BrowserRouter>
                                            <Switch>
                                                <Layout>
                                                    <Route exact path="/signup"
                                                           component={SignupScreen}
                                                           title="Signup"/>
                                                    <Route exact path="/signin"
                                                           component={SigninScreen}
                                                           title="Signin"/>
                                                    <Route exact path="/guest"
                                                           component={GuestTokenScreen}
                                                           title="Guest"/>
                                                    <AuthenticatedRoute path="/presets"
                                                                        component={BinauralBeatsScreen}
                                                                        title="BinauralBeats"/>
                                                    <AuthenticatedRoute path="/preset_show/:preset_id"
                                                                        component={BinauralBeatEditScreen}
                                                                        title="Beat Edit"/>
                                                    <AuthenticatedRoute path="/create"
                                                                        component={BinauralBeatEditScreen}
                                                                        title="Create a beat"/>
                                                </Layout>
                                            </Switch>
                                        </BrowserRouter>
                                    </BinauralBeatContext.Provider>
                                </GradientContext.Provider>
                            </TitleContext.Provider>
                        </SettingsDrawerContext.Provider>
                    </ThemeContext.Provider>
                </AuthContext.Provider>
            </ErrorContext.Provider>
        )
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
