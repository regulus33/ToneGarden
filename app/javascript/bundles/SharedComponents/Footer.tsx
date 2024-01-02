import * as React from 'react';
import {FunctionComponent, useEffect} from 'react'
import {BottomNavigation} from '@mui/material';
import {BottomNavigationAction} from '@mui/material';
import useStyles from "../Styles/StylesFooter";
import {MusicNote} from "@mui/icons-material";
import {Add} from "@mui/icons-material";
import {useHistory} from 'react-router-dom'
import FunctionName from "../Utils/FunctionName";

const Footer: FunctionComponent = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(null)
    const history = useHistory()

    // Keeps highlighted
    // button clear if landing from url
    useEffect(() => {
        setValue(null)
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        history.replace(`/${newValue}`)
    }

    return (
        <BottomNavigation value={ value } onChange={handleChange} className={classes.root}>
            <BottomNavigationAction label="Sounds" value="presets" icon={<MusicNote/>}/>
            <BottomNavigationAction label="New  " value="create" icon={ <Add/>}/>
        </BottomNavigation>
    );
}
export default Footer
