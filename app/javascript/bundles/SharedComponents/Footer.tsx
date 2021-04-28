import * as React from 'react';
import { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import useStyles from "../Styles/StylesFooter";
import {IconButton} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
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
            <IconButton>
                <PlayArrowIcon></PlayArrowIcon>
            </IconButton>
            <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
    );
}
export default Footer