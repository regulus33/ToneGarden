import {CircularProgress} from "@mui/material";
import * as React from "react";
import useStyles from "../Styles/StylesProgressWheel"
import {FunctionComponent} from "react";
import {useGradient} from "../State/GradientContext";

const ProgressWheel: FunctionComponent = () => {

    const {gradient} = useGradient()
    const classes = useStyles(gradient.toProps())

    return (
        <div className={classes.wrapper} >
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
        </div>
    )
}

export default ProgressWheel
