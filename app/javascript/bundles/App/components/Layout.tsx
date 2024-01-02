import * as React from 'react'
import {FunctionComponent, ReactNode} from 'react'
import {Theme, useTheme} from '../../State/ThemeContext'
import {useTitle} from '../../State/TitleContext'
import Header from '../../SharedComponents/Header'
import Footer from '../../SharedComponents/Footer'
import useStyles from "../../Styles/StylesLayout"
import {useGradient} from "../../State/GradientContext"
import {useSettingsDrawer} from "../../State/SettingsDrawerContext"
import DrawerState from "../../Models/DrawerState"
import SettingsDrawer from "../../SharedComponents/SettingsDrawer"
import Flash from "../../SharedComponents/Flash"
import {useFlashMessage} from "../../State/FlashMessageContext"
import {useHistory} from 'react-router-dom'
import NetworkService from "../../Network/NetworkService"
import Routes from "../../Network/Routes"
import {useAuthenticated} from "../../State/AuthContext"
import {useError} from "../../State/ErrorContext"

export interface WrapperProps {
  children: ReactNode
}

interface ContentProps {
  title?: string,
  children: ReactNode
}

const Content: FunctionComponent<ContentProps> = (props) => {
  const {theme} = useTheme()
  const {title} = useTitle()
  const {gradient} = useGradient()
  const classes = useStyles({theme: theme})
  const {drawerState, setDrawerState} = useSettingsDrawer()
  const {flashMessage, setFlashMessage} = useFlashMessage()
  const {authenticated, setAuthenticated} = useAuthenticated()
  const {setError} = useError()
  const history = useHistory()
  console.log(title)
  NetworkService.getInstance().onServerCrash = function () {
    history.replace(Routes.ErrorScreen)
  }

  NetworkService.getInstance().setAuthenticated = setAuthenticated
  NetworkService.getInstance().setFlashMessage = setFlashMessage
  NetworkService.getInstance().setError = setError

  const toggleSettingsDrawer = (event) => {
    const {tagName} = event.target
    switch (tagName) {
      case "INPUT":
        return
      case "LABEL":
        return
      default:
        const {parentElement} = event.target
        if (parentElement.tagName === "LABEL") {
          return
        }
    }

    const open = !drawerState.open
    setDrawerState(new DrawerState(open, drawerState.anchor))
  }

  return (
    <div className={classes.mainContainer}>
      <Header authenticated={authenticated} toggleSettingsDrawer={toggleSettingsDrawer} title={title}
              gradient={gradient}/>
      {props.children}
      <SettingsDrawer toggleSettingsDrawer={toggleSettingsDrawer}/>
      <Flash flashMessage={flashMessage}/>
      {authenticated ? <Footer/> : null}
    </div>
  )
}

const Layout: FunctionComponent<WrapperProps> = (props) => {
  return (<Content children={props.children} title={'Title'}/>);
}

export default Layout;
