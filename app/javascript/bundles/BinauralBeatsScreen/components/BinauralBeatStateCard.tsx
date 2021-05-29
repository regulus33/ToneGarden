import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import * as React from "react";
import {Link} from "react-router-dom";
import useStyles from '../../Styles/StylesPresetCard'
import {BinauralBeatState} from "../../State/BinauralBeatContext";
import BinauralBeat from "../../Models/BinauralBeat";
import {FunctionComponent} from "react";
import FrequencyRangeHelper from "../../Helpers/FrequencyRangeHelper";
interface Props {
    binauralBeatState: BinauralBeatState
}
const BinauralBeatStateCard: FunctionComponent<Props> = (props) => {
    const { binauralBeatState } = props
    const { carrierOscillator } = binauralBeatState
    const classes = useStyles();
    return (<Card className={classes.presetCard}>
        <CardContent>
            <div className={classes.cardContent}>
                <Typography component="h5" variant="h5">
                    <span className={classes[FrequencyRangeHelper.rangeString(carrierOscillator)]}>
                        <span>{FrequencyRangeHelper.rangeSymbol(carrierOscillator)} &nbsp;</span>
                    </span>
                    {binauralBeatState.name}
                </Typography>
            </div>
        </CardContent>
        <div className={classes.controls}>
            <Link to={{
                pathname: `/preset_show/${binauralBeatState.id}`,
                binauralBeatState}}>
                <IconButton aria-label="play/pause">
                    <PlayArrowIcon className={classes.playArrowIcon}/>
                </IconButton>
            </Link>
        </div>
    </Card>)
}
export default BinauralBeatStateCard