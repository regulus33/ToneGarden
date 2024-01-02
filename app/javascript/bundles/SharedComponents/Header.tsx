import * as React from 'react';
import {FunctionComponent, SyntheticEvent} from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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
                    { props.authenticated ? <MenuIcon /> : null }
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    <div dangerouslySetInnerHTML={{__html: props.title}}/>
                </Typography>
                <img style={{maxWidth: '120px'}} src={'/logo_white.svg'}/>
            </Toolbar>
        </AppBar>
    );
}
export default Header
