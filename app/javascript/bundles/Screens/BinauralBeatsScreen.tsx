import * as React from 'react'
import {FunctionComponent, useEffect, useState} from 'react'
import NetworkService from "../Network/NetworkService"
import Routes from "../Network/Routes"
import Grid from '@material-ui/core/Grid'
import BinauralBeatsList from '../Models/BinauralBeatsList'
import BinauralBeatStateCard from "../SharedComponents/BinauralBeatStateCard"
import {useTitle} from "../State/TitleContext"
import ProgressWheel from "../SharedComponents/ProgressWheel"
import {BinauralBeatState} from "../State/BinauralBeatContext";

interface PresetsScreenProps {}

const BinauralBeatsScreen: FunctionComponent<PresetsScreenProps> = (props) => {
    const { setTitle } = useTitle()
    const [binauralBeatStates, setBinauralBeatStates] = useState([])


    useEffect(() => {
        setTitle('Select A Beat')
        NetworkService
            .getInstance()
            .get(Routes.BinauralBeats)
            .then(function (json) {
                const binauralBeatStates = new BinauralBeatsList(
                    json.binauralBeatStates).binauralBeatStates
                setBinauralBeatStates(binauralBeatStates)
            })
    }, [])

    if (binauralBeatStates.length > 0) {
        return (
            <Grid container spacing={2}> {
                binauralBeatStates.map((binauralBeatState: BinauralBeatState) => {
                    return (
                        <Grid key={binauralBeatState.id} item xs={12} sm={12}  lg={4}>
                            <BinauralBeatStateCard binauralBeatState={binauralBeatState}/>
                        </Grid>
                    )
                })
            }
            </Grid>
        )
    } else {
        return (
            <ProgressWheel/>
        )
    }
}

export default BinauralBeatsScreen