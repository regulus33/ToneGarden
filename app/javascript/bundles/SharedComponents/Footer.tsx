import * as React from 'react';
import { FunctionComponent } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import useStyles from "../Styles/StylesFooter";
import SettingsIcon from "@material-ui/icons/Settings";
import CreateIcon from "@material-ui/icons/Create";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
interface FooterProps {
}

const Footer: FunctionComponent<FooterProps> = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction label="Settings" value="settings" icon={<SettingsIcon/>} />
            <BottomNavigationAction label="Binaural beats" value="beats" icon={<MusicNoteIcon/>} />
            <BottomNavigationAction label="Create" value="create" icon={<CreateIcon />} />
        </BottomNavigation>
    );
}
export default Footer