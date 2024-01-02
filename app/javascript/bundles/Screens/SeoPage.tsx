import * as React from 'react'
import {FunctionComponent} from "react"
import useStyles from "../Styles/StylesSeoPage"
import {useHistory} from 'react-router-dom'
// import FeatureGraphic from '../SVG/feature_graphic.svg'
//
interface SeoPageProps {
    errorMessage?: string
}


const SeoPage: FunctionComponent<SeoPageProps> = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const newProps = { location: {path: 'create', ...props}}
    const onButtonClick = () => {
        history.goBack()
    }

    return (
        <div>
            <div className={classes.container}>
                <button className={classes.cta}>Make some binaural beats now!</button>
                {/*<FeatureGraphic/>*/}
            </div>
        </div>
    )
}

export default SeoPage