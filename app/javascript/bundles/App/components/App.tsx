import * as React from 'react'
import {StyledEngineProvider} from "@mui/material";
import {FunctionComponent, useEffect, useState} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SignupScreen from "../../Screens/SignupScreen"
import BinauralBeatsScreen from "../../Screens/BinauralBeatsScreen"
import BinauralBeatEditScreen from "../../Screens/BinauralBeatEditScreen"
import Layout from './Layout'
import {Theme, ThemeContext} from "../../State/ThemeContext"
import {GradientContext} from "../../State/GradientContext"
import {AuthContext} from "../../State/AuthContext"
import {ErrorContext} from "../../State/ErrorContext"
import {UseAudioWorkletContext} from "../../State/UseAudioWorkletContext"
import {UseWhiteNoiseContext} from "../../State/UseWhiteNoiseContext"
import Gradient from '../../Models/Gradient'
import {TitleContext} from "../../State/TitleContext"
import {SettingsDrawerContext} from "../../State/SettingsDrawerContext"
import AuthenticatedRoute from "./AuthenticatedRoute"
import LocalStorageService from "../../Network/LocalStorageService"
import ProgressWheel from "../../SharedComponents/ProgressWheel"
import DrawerState from "../../Models/DrawerState";
import SigninScreen from "../../Screens/SigninScreen";
import GuestTokenScreen from "../../Screens/GuestTokenScreen";
import Routes from "../../Network/Routes";
import FlashMessage, {FlashEnum} from "../../Models/FlashMessage";
import {FlashMessageContext} from '../../State/FlashMessageContext'
import ErrorScreen from "../../Screens/ErrorScreen";
import {createTheme, ThemeProvider, useTheme} from '@mui/material/styles';
import {darkThemeOptions, themeOptions} from "../../Styles/Theme";
import BodyClassHelper from "../../Helpers/BodyClassHelper";
import SeoPage from "../../Screens/SeoPage";

const App: FunctionComponent = () => {
  const darkTheme = createTheme(darkThemeOptions)
  const lightTheme = createTheme(themeOptions)
  const [theme, setTheme] = React.useState(Theme.Dark)
  const [authenticated, setAuthenticated] = React.useState(false)
  const [title, setTitle] = React.useState('Binaural Beats')
  const [useAudioWorklet, setUseAudioWorklet] = React.useState(true)
  const [useWhiteNoise, setUseWhiteNoise] = React.useState(true)
  const [gradient, setGradient] = React.useState(
    new Gradient(
      'alpha'
    )
  )
  const [error, setError] = React.useState(null)
  const [flashMessage, setFlashMessage] = React.useState(
    new FlashMessage(
      'default',
      false,
      FlashEnum.success)
  )

  const [drawerState, setDrawerState] = React.useState(
    new DrawerState(
      false,
      'left'
    )
  )

  const [loaded, setLoaded] = useState(
    false
  )

  useEffect(() => {
    setTheme(LocalStorageService.getTheme())
    setAuthenticated(LocalStorageService.getIsAuth())
    setLoaded(true)
  }, [])

  BodyClassHelper(theme)

  if (loaded) {
    return (
      <StyledEngineProvider injectFirst>
        <ThemeContext.Provider value={{theme, setTheme}}>
          <ThemeProvider theme={theme === Theme.Light ? lightTheme : darkTheme}>
            <ErrorContext.Provider value={{error, setError}}>
              <AuthContext.Provider value={{authenticated, setAuthenticated}}>
                <SettingsDrawerContext.Provider value={{drawerState, setDrawerState}}>
                  <TitleContext.Provider value={{title, setTitle}}>
                    <GradientContext.Provider value={{gradient, setGradient}}>
                      <FlashMessageContext.Provider value={{flashMessage, setFlashMessage}}>
                        <UseAudioWorkletContext.Provider
                          value={{useAudioWorklet, setUseAudioWorklet}}>
                          <UseWhiteNoiseContext.Provider
                            value={{useWhiteNoise, setUseWhiteNoise}}>
                            <BrowserRouter>
                              <Switch>
                                <Layout>
                                  <Route exact path={Routes.Root}
                                         component={BinauralBeatsScreen}/>
                                  <Route exact path={Routes.ErrorScreen}
                                         component={ErrorScreen}/>
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
                                  <AuthenticatedRoute
                                    path={Routes.BinauralBeatEditScreen(':preset_id')}
                                    keyProp="preset_show"
                                    component={BinauralBeatEditScreen as FunctionComponent}
                                    title="Beat Edit"/>
                                  <AuthenticatedRoute
                                    path={Routes.BinauralBeatsCreateScreen}
                                    keyProp="create"
                                    component={BinauralBeatEditScreen as FunctionComponent}
                                    title="Create a beat"/>
                                  <AuthenticatedRoute
                                      path={Routes.SeoScreen}
                                      keyProp="welcome"
                                      component={SeoPage as FunctionComponent}
                                      title="Create a beat"/>
                                </Layout>
                              </Switch>
                            </BrowserRouter>
                          </UseWhiteNoiseContext.Provider>
                        </UseAudioWorkletContext.Provider>
                      </FlashMessageContext.Provider>
                    </GradientContext.Provider>
                  </TitleContext.Provider>
                </SettingsDrawerContext.Provider>
              </AuthContext.Provider>
            </ErrorContext.Provider>
          </ThemeProvider>
        </ThemeContext.Provider>
      </StyledEngineProvider>
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
