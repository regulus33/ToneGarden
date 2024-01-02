import Preset from "../../Models/Preset";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import * as React from "react";
import {Link} from "react-router-dom";
import useStyles from '../../Styles/StylesPresetCard'

function PresetCard(props: { preset: Preset }) {
    const classes = useStyles();
    return (<Card className={classes.presetCard}>
        <CardContent>
            <div className={classes.cardContent}>
                <Typography component="h5" variant="h5">
                    <span className={classes[props.preset.rangeString()]}>
                        <span>{props.preset.rangeSymbol()} &nbsp;</span>
                    </span>
                    {props.preset.name}
                </Typography>
            </div>
        </CardContent>
        <div className={classes.controls}>
            <Link to={  `/preset_show/${props.preset.id}`}>
                <IconButton aria-label="play/pause">
                    <PlayArrowIcon className={classes.playArrowIcon}/>
                </IconButton>
            </Link>
        </div>
    </Card>)
}

export default PresetCard