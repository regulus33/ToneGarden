import * as React from 'react'
import {FunctionComponent} from "react"
import useStyles from "../Styles/StylesSeoPage"
import {useHistory} from 'react-router-dom'
import {FEATURE_GRAPH_BACKGROUND, MAIN_CONTAINER_ID} from "../Models/Constants";
import SvgComponent from "../SVG/FeatureGraphic";

//
interface SeoPageProps {
    errorMessage?: string
}

// You can convert an svg to react here https://react-svgr.com/playground/

const SeoPage: FunctionComponent<SeoPageProps> = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const newProps = {location: {path: 'create', ...props}}
    const onButtonClick = () => {
        history.goBack()
    }

    const matchBackgroundToSVG =
    `div#${MAIN_CONTAINER_ID} {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: ${FEATURE_GRAPH_BACKGROUND};
    }`

    return (
        <div>
            <style dangerouslySetInnerHTML={{__html: matchBackgroundToSVG}}/>
            <div className={classes.container}>
                <button className={classes.cta}>Make some binaural beats now!</button>
                <SvgComponent className={classes.hero}/>
            </div>
        </div>
    )
}

export default SeoPage