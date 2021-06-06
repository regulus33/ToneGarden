import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import * as React from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {FunctionComponent} from "react"
import {Anchor} from "../Models/DrawerState"
import {useSettingsDrawer} from "../State/SettingsDrawerContext";
import {ExitToApp, InfoRounded} from "@material-ui/icons";
import SecureStorageService from "../Network/SecureStorageService";
import {useAuthenticated} from "../State/AuthContext";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
})

interface Props {
    toggleSettingsDrawer: ()=>void,
}

const SettingsDrawer: FunctionComponent<Props> = (props) => {
    const classes = useStyles()
    const { drawerState } = useSettingsDrawer();
    const { setAuthenticated } = useAuthenticated();

    const signout = () => {
        SecureStorageService.setToken(null)
        SecureStorageService.setIsAuth(false)
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
                <ListItem button key={1}>
                    <ListItemIcon><InfoRounded/></ListItemIcon>
                    <ListItemText primary={'About binaural beats'}/>
                </ListItem>
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