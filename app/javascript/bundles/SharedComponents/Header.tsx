import * as React from 'react';
import {FunctionComponent, SyntheticEvent} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from '../Styles/StylesHeader';
import Gradient from "../Models/Gradient";
import {useGradient} from "../State/GradientContext";

interface HeaderProps {
    title: string|object,
    gradient: Gradient,
    toggleSettingsDrawer: (event: SyntheticEvent)=>void
}

const Header: FunctionComponent<HeaderProps> = (props) => {
    const { gradient } = useGradient()
    const classes = useStyles(gradient.toProps());

    return (
        <AppBar position="fixed" className={classes.root} style={{background: props.gradient.backGround()}}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.toggleSettingsDrawer}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {props.title}
                </Typography>
                <img style={{maxWidth: '120px'}} src={'/logo_white.svg'}/>
            </Toolbar>
        </AppBar>
    );
}
export default Header
