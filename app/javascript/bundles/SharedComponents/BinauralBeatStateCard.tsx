import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from '@mui/icons-material/Delete'
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import * as React from "react"
import {Link} from "react-router-dom"
import useStyles from '../Styles/StylesPresetCard'
import BinauralBeatState from "../Types/BinauralBeatTypes"
import {forwardRef, FunctionComponent} from "react";
import FrequencyRangeHelper from "../Helpers/FrequencyRangeHelper"
import Zoom from '@mui/material/Zoom'
import {CardActions, CardHeader, ListItemIcon, ListItemText} from "@mui/material"
import DropDown from "./DropDown"
import MenuItem from "@mui/material/MenuItem";
import NetworkService from "../Network/NetworkService";
import Routes from "../Network/Routes";
import {useFlashMessage} from "../State/FlashMessageContext";
import FlashMessage, {FlashEnum} from "../Models/FlashMessage";
import BinauralBeatsList from "../Models/BinauralBeatsList";
import {CreateSharp} from "@mui/icons-material";
import {useHistory} from 'react-router-dom'
import {chompString} from "../Helpers/ViewHelper";

interface BinauralBeatStateCardProps {
    binauralBeatStates: Array<BinauralBeatState>,
    setBinauralBeatStates: any,
    binauralBeatState: BinauralBeatState,
    loaded: boolean,
    index: number,
}

export interface DeleteBeatProps {
    keyPass: number | string,
    onClick: (event: any) => void,
    disabled: boolean,
}

export const DeleteBeat: FunctionComponent<DeleteBeatProps> = forwardRef((props: DeleteBeatProps, ref: any) => {
    return (
        <MenuItem ref={ref} disabled={props.disabled} key={props.keyPass} onClick={props.onClick}>
            <ListItemIcon>
                <DeleteIcon fontSize="small"/>
            </ListItemIcon>
            <ListItemText primary="Delete"/>
        </MenuItem>)
})

export interface EditBeatProps {
    keyPass: number | string,
    onClick: (event: any) => void,
}


export const EditBeat: FunctionComponent<EditBeatProps> = forwardRef((props: EditBeatProps, ref: any) => {
    return (
        <MenuItem ref={ref} key={props.keyPass} onClick={props.onClick}>
            <ListItemIcon>
                <CreateSharp fontSize="small"/>
            </ListItemIcon>
            <ListItemText primary="Edit"/>
        </MenuItem>)
})

const BinauralBeatStateCard: FunctionComponent<BinauralBeatStateCardProps> = (props) => {
    const {binauralBeatState, binauralBeatStates, setBinauralBeatStates} = props
    const {carrierOscillator} = binauralBeatState
    const {setFlashMessage} = useFlashMessage()
    const classes = useStyles()
    const history = useHistory()

    return (
        <Zoom
            in={props.loaded}
            style={{transitionDelay: props.loaded ? `${50 * props.index}ms` : '0ms'}}>
            <Card className={classes.presetCard} elevation={0}>
                <CardHeader className={classes.cardHeader}
                    avatar={
                        <Typography className={classes.avatar} component="h5" variant="h5">
                            <span className={classes[FrequencyRangeHelper.rangeString(carrierOscillator)]}>
                                <span>{FrequencyRangeHelper.rangeSymbol(carrierOscillator)} &nbsp;</span>
                            </span>
                        </Typography>
                    }
                    title={
                        <Typography component="h5" variant="h5">
                            {chompString(20, binauralBeatState.name)}
                        </Typography>
                    }
                    subheader={
                        binauralBeatState.description
                    }
                    action={
                        <DropDown options={
                            [
                                {
                                    Component: DeleteBeat,
                                    keyPass: String(props.index) + String(1),
                                    disabled: (!binauralBeatState.editable),
                                    onClick: async () => {
                                        try {
                                            await NetworkService
                                                .getInstance()
                                                .delete(
                                                    Routes
                                                        .BinauralBeatDelete(
                                                            String(binauralBeatState.id)
                                                        )
                                                )
                                            setFlashMessage(new FlashMessage(`${binauralBeatState.name || 'beat'} deleted`, true, FlashEnum.success))
                                            setBinauralBeatStates(new BinauralBeatsList(binauralBeatStates).without(binauralBeatState))
                                        } catch (e) {
                                            setFlashMessage(new FlashMessage('Oops! Problem deleting beat', true, FlashEnum.error))
                                        }
                                    }

                                },
                                {
                                    Component: EditBeat,
                                    keyPass: String(props.index) + String(2),
                                    disabled: (!binauralBeatState.editable),
                                    onClick: () => history.push({
                                        pathname: `/preset_show/${binauralBeatState.id}`,
                                        binauralBeatState,
                                        playBeat: false,
                                    })
                                }
                            ]
                        }/>
                    }
                />
                <CardActions>
                    <div className={classes.controls}>
                        <Link to={{
                            pathname: `/preset_show/${binauralBeatState.id}`,
                            binauralBeatState,
                            playBeat: true,
                        }}>
                            <IconButton aria-label="play/pause">
                                <PlayArrowIcon className={classes.playArrowIcon}/>
                            </IconButton>
                        </Link>
                    </div>
                </CardActions>
            </Card>
        </Zoom>
    )
}
export default BinauralBeatStateCard

