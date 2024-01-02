import * as React from 'react';
import {FunctionComponent, SyntheticEvent} from 'react'
import {AppBar} from '@mui/material';
import {Toolbar} from '@mui/material';
import {Typography} from '@mui/material';
import {IconButton} from '@mui/material';
import {Menu} from '@mui/icons-material';
import useStyles from '../Styles/StylesHeader';
import Gradient from "../Models/Gradient";
import {useGradient} from "../State/GradientContext";

interface HeaderProps {
    title: string,
    gradient: Gradient,
    toggleSettingsDrawer: (event: SyntheticEvent)=>void,
    authenticated: boolean
}

const Header: FunctionComponent<HeaderProps> = (props) => {
    const { gradient } = useGradient()
    const classes = useStyles(gradient.toProps());

    return (
        <AppBar elevation={0} position="fixed" className={classes.root} style={{background: props.gradient.backGround()}}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.toggleSettingsDrawer}
                    edge="start"
                    size="large">
                    { props.authenticated ? <Menu /> : null }
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    <div dangerouslySetInnerHTML={{__html: props.title}}/>
                </Typography>
                <img className={classes.logo} style={{maxWidth: '120px'}} src={'/logo_white.svg'}/>
            </Toolbar>
        </AppBar>
    );
}
export default Header
