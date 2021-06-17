import * as React from 'react';
import { FunctionComponent } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import useStyles from "../Styles/StylesFooter";
import CreateIcon from "@material-ui/icons/Create";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import { useHistory } from 'react-router-dom'

interface Props {
}

const Footer: FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('presets')
    const history = useHistory()

    history.listen((location, action) => {
        switch(location.pathname) {
            case '/create':
                setValue('create')
                break
            case '/presets':
                setValue('presets')
            default:
                setValue(null)
        }
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
        history.replace(`/${newValue}`)
    };
    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction label="Binaural beats" value="presets" icon={<MusicNoteIcon/>} />
            <BottomNavigationAction label="Create" value="create" icon={<CreateIcon />} />
        </BottomNavigation>
    );
}
export default Footer