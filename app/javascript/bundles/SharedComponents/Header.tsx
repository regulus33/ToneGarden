import * as React from 'react';
import {FunctionComponent} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from '../Styles/StylesHeader';
import Gradient from "../Models/Gradient";

interface HeaderProps {
    screen: string,
    gradient: Gradient
}

const Header: FunctionComponent<HeaderProps> = (props) => {
    const classes = useStyles();

    return (
        <AppBar position="static"  style={{background: props.gradient.backGround()}}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    {props.screen}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
export default Header
