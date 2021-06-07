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
import {SettingsDrawerContext} from "../../State/SettingsDrawerContext"
import NetworkService from "../../Network/NetworkService"
import AuthenticatedRoute from "./AuthenticatedRoute"
import SecureStorageService from "../../Network/SecureStorageService"
import ProgressWheel from "../../SharedComponents/ProgressWheel"
import DrawerState from "../../Models/DrawerState";
import SigninScreen from "../../Screens/SigninScreen";
import GuestTokenScreen from "../../Screens/GuestTokenScreen";
import Routes from "../../Network/Routes";

const App: FunctionComponent = () => {
    const [authenticated, setAuthenticated] = React.useState(false)
    const [theme, setTheme] = React.useState(Theme.Light)
    const [title, setTitle] = React.useState('Binaural Beats')
    const [gradient, setGradient] = React.useState(new Gradient('alpha'))
    const [error, setError] = React.useState(null)

    // TODO: we should use Anchor or remove it.
    const [drawerState, setDrawerState] = React.useState(new DrawerState(false, 'left'))

    // TODO: no dispatches outside dom tree
    NetworkService.getInstance().setAuthenticated = setAuthenticated
    NetworkService.getInstance().setError = setError

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
                                    <BrowserRouter>
                                        <Switch>
                                            <Layout>
                                                <Route exact path={Routes.SignupScreen}
                                                       component={SignupScreen}
                                                       title="Signup"/>
                                                <Route exact path={Routes.SigninScreen}
                                                       component={SigninScreen}
                                                       title="Signin"/>
                                                <Route exact path={Routes.GuestTokenScreen}
                                                       component={GuestTokenScreen}
                                                       title="Guest"/>
                                                <AuthenticatedRoute path={Routes.BinauralBeatsScreen}
                                                                    component={BinauralBeatsScreen}
                                                                    keyProp="presets"
                                                                    title="Binaural Beats"/>
                                                <AuthenticatedRoute path={Routes.BinauralBeatEditScreen(':preset_id')}
                                                                    keyProp="preset_show"
                                                                    component={BinauralBeatEditScreen}
                                                                    title="Beat Edit"/>
                                                <AuthenticatedRoute path={Routes.BinauralBeatsCreateScreen}
                                                                    keyProp="create"
                                                                    component={BinauralBeatEditScreen}
                                                                    title="Create a beat"/>
                                            </Layout>
                                        </Switch>
                                    </BrowserRouter>
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
