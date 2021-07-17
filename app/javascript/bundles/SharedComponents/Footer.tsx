import * as React from 'react';
import {FunctionComponent, useEffect} from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import useStyles from "../Styles/StylesFooter";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AddIcon from "@material-ui/icons/Add";
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
        console.log(`[${FunctionName()}]: value of event: ${event.inspect}`)
        setValue(newValue);
        history.replace(`/${newValue}`)
    }

    return (
        <BottomNavigation value={ value } onChange={handleChange} className={classes.root}>
            <BottomNavigationAction label="Sounds" value="presets" icon={<MusicNoteIcon/>}/>
            <BottomNavigationAction label="New  " value="create" icon={ <AddIcon />}/>
        </BottomNavigation>
    );
}
export default Footer