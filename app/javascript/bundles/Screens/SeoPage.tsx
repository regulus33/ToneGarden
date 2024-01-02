import * as React from 'react'
import {FunctionComponent} from "react"
import useStyles from "../Styles/StylesSeoPage"
import {useHistory} from 'react-router-dom'
import {animationStyles, FEATURE_GRAPH_BACKGROUND, MAIN_CONTAINER_ID} from "../Models/Constants";
import SvgComponent from "../SVG/FeatureGraphic";
import CallToAction from "../SharedComponents/CallToAction";

//
interface SeoPageProps {
    errorMessage?: string
}

// You can convert an svg to react here https://react-svgr.com/playground/

const SeoPage: FunctionComponent<SeoPageProps> = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const matchBackgroundToSVG =
        `div#${MAIN_CONTAINER_ID} {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: ${FEATURE_GRAPH_BACKGROUND};
    }`



    const blink = () => {
        const stars = Array.from(document.getElementsByTagName('circle')).filter(c => c.id.includes("s-"))

        const random = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }


        const randoTwinkleAnim = (min, max) => {
            const randomSeconds = random(min, max)
            return `twinkle ${randomSeconds}s ease-in-out infinite`
        }


        const twinkleTwinkle = (group, min, max) => {
            group.forEach(function (star){
                star.style.animation = randoTwinkleAnim(min, max)
            })

        }

        twinkleTwinkle(stars, 1.8, 3.0)
    }
    
    window.addEventListener('load', function () {
        blink()
    })

    return (
        <div>
            <style dangerouslySetInnerHTML={{__html: matchBackgroundToSVG}}/>
            <style dangerouslySetInnerHTML={{__html: animationStyles}}/>
            <div className={classes.container}>
                <div className={classes.cta}>
                    <CallToAction onCTAClick={() => {
                        console.log("clicked")
                        history.replace(`/create`)
                    }} buttonText={'Make Your Own Binaural Beats'}/>
                </div>
                <SvgComponent className={classes.hero}/>
            </div>
        </div>
    )
}

export default SeoPage