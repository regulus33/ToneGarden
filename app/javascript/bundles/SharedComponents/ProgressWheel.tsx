import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as React from "react";
import useStyles from "../Styles/StylesProgressWheel"
import {FunctionComponent} from "react";
import {useGradient} from "../State/GradientContext";

const ProgressWheel: FunctionComponent = () => {

    const {gradient} = useGradient()
    const classes = useStyles(gradient.toProps())
    return(
        <div className={classes.container}>
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.top}
                classes={{
                    circle: classes.circle,
                }}
                size={40}
                thickness={4}
            />
        </div>
    )
}

export default ProgressWheel