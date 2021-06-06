import * as React from 'react'
import {FunctionComponent, useContext, useEffect} from 'react'
import NetworkService from "../Network/NetworkService"
import Routes from "../Network/Routes"
import ProgressWheel from "../SharedComponents/ProgressWheel"
import { useHistory } from 'react-router-dom'
import SecureStorageService from "../Network/SecureStorageService";
import useStyles from "../Styles/StylesGuestTokenScreen";

interface Props {
}

const GuestTokenScreen: FunctionComponent<Props> = (props) => {
    const history = useHistory()
    const classes = useStyles()

    useEffect(() => {
        NetworkService.getInstance()
            .get(Routes.Guest)
            .then((function (json){
                if(json.token) {
                    SecureStorageService.setToken(json.token)
                    history.replace('/presets')
                }
            }))

    })

    return (
        <div className={classes.guestContainer}>
            <ProgressWheel/>
        </div>
    )
}

export default GuestTokenScreen

