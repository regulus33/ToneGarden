import * as React from 'react';
import {FunctionComponent, useState} from 'react'
import {useStyles} from "../../Styles/StylesSettingsScreen";
import {List, ListItemIcon, ListItemText} from "@material-ui/core";
import {ListItem} from "semantic-ui-react";
import {ExitToApp} from "@material-ui/icons";

interface Props {

}

const SettingsScreen: FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    return (
        <div>
            <List component="nav" className={classes.list} aria-label="contacts">
                <ListItem button>
                    <ListItemIcon>
                        <ExitToApp/>
                    </ListItemIcon>
                    <ListItemText primary="Chelsea Otakan"/>
                </ListItem>
                <ListItem button>
                    <ListItemText inset primary="Eric Hoffman"/>
                </ListItem>
            </List>
        </div>
    )
}

export default SettingsScreen