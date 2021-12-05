import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Switch from '@material-ui/core/Switch'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import * as React from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {ChangeEvent, FunctionComponent, SyntheticEvent, useEffect, useState} from "react"
import {Anchor} from "../Models/DrawerState"
import {useSettingsDrawer} from "../State/SettingsDrawerContext"
import {ExitToApp, InfoRounded} from "@material-ui/icons"
import LocalStorageService from "../Network/LocalStorageService"
import {useAuthenticated} from "../State/AuthContext"
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {useWhiteNoiseCtx} from "../State/UseWhiteNoiseContext"
import NetworkService from "../Network/NetworkService"
import Routes from "../Network/Routes"
import CamelToSnake from "../Utils/CamelToSnake"
import {useAudioWorkletCtx} from "../State/UseAudioWorkletContext"
import CurrentUser from "../Utils/CurrentUser"
import Build from "../Helpers/Urls"
import GotToUrl from "../Utils/GoToUrl"

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
})

interface Props {
    toggleSettingsDrawer: (event: SyntheticEvent) => void,
}

// This component kind of sucks because it is both "smart" and "dumb" taking toggleSettingsDrawer as a prop.
// Its not ideal but we need to call the function in both menu click (in Header) and when clicking the drawer or other spots in doc.
const SettingsDrawer: FunctionComponent<Props> = (props) => {
    const classes = useStyles()
    const {drawerState} = useSettingsDrawer()
    const {setAuthenticated} = useAuthenticated()
    const PreferencesHandler = {...useAudioWorkletCtx(), ...useWhiteNoiseCtx()}

    const handlePreferencesToggle = (event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
        const name = event.target.name.split(':').shift()
        const methodToCall = event.target.name.split(':').pop()

        PreferencesHandler[methodToCall](checked)

        NetworkService.getInstance().put(
            Routes.UpdateUser, {
                [CamelToSnake(name)]: checked
            }
        )
    }

    //Set user preferences with latest user data
    useEffect(()=> {
        (async () => {
            const user = await CurrentUser()
            PreferencesHandler.setUseWhiteNoise(user.useWhiteNoise)
            PreferencesHandler.setUseAudioWorklet(user.useAudioWorklet)
        })()

    }, [])

    const signout = () => {
        LocalStorageService.setToken(null)
        LocalStorageService.setIsAuth(false)
        setAuthenticated(false)
    }

    const list = (anchor: Anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={props.toggleSettingsDrawer}
            onKeyDown={props.toggleSettingsDrawer}
        >
            <List>
                <ListItem button onClick={signout} key={1}>
                    <ListItemIcon><ExitToApp/></ListItemIcon>
                    <ListItemText primary={'Signout'}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem button onClick={() => GotToUrl(Build('welcome'))} key={3}>
                    <ListItemIcon><InfoRounded/></ListItemIcon>
                    <ListItemText primary={'About'}/>
                </ListItem>
                <ListItem button onClick={() => GotToUrl(Build('privacy-policy'))} key={2}>
                    <ListItemIcon><ExitToApp/></ListItemIcon>
                    <ListItemText primary={'Privacy policy'}/>
                </ListItem>
                <Divider/>
                <ListItem style={{position: 'relative'}}>
                    <FormControlLabel
                        control={
                            <Switch
                                color="secondary"
                                inputProps={{'aria-label': 'checkbox with default color'}}
                                onChange={handlePreferencesToggle}
                                checked={PreferencesHandler.useWhiteNoise}
                                name="useWhiteNoise:setUseWhiteNoise"
                            />
                        }
                        label="Whitenoise enabled"
                    />
                </ListItem>
                {/*TODO: remove this whole feature, we are happy with the current web audio api */}
                {/*<ListItem style={{position: 'relative'}}>*/}
                {/*    <FormControlLabel*/}
                {/*        control={*/}
                {/*            <Switch*/}
                {/*                color="secondary"*/}
                {/*                inputProps={{'aria-label': 'checkbox with default color'}}*/}
                {/*                onChange={handlePreferencesToggle}*/}
                {/*                checked={PreferencesHandler.useAudioWorklet}*/}
                {/*                name="useAudioWorklet:setUseAudioWorklet"*/}
                {/*            />*/}
                {/*        }*/}
                {/*        label="Use audio worklet"*/}
                {/*    />*/}
                {/*</ListItem>*/}
            </List>
        </div>
    )

    return (
        <Drawer anchor={drawerState.anchor} open={drawerState.open} onClose={props.toggleSettingsDrawer}>
            {list(drawerState.anchor)}
        </Drawer>
    )
}


export default SettingsDrawer