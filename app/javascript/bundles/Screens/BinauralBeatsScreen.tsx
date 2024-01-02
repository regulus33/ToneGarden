import * as React from 'react'
import {FunctionComponent, useEffect, useState} from 'react'
import NetworkService from "../Network/NetworkService"
import Routes from "../Network/Routes"
import Grid from '@material-ui/core/Grid'
import BinauralBeatsList from '../Models/BinauralBeatsList'
import BinauralBeatStateCard from "../SharedComponents/BinauralBeatStateCard"
import {useTitle} from "../State/TitleContext"
import BinauralBeatState from "../Types/BinauralBeatTypes";
import {Slide} from "@material-ui/core";
import useStyles from "../Styles/StylesBinarualBeatsScreen";


const BinauralBeatsScreen: FunctionComponent = () => {
    const {setTitle} = useTitle()
    const [binauralBeatStates, setBinauralBeatStates] = useState([])
    const classes = useStyles()

    useEffect( () => {
        (async () => {
            setTitle('Select A Beat')
            // @ts-ignore https://stackoverflow.com/questions/40097820/property-does-not-exist-on-type-object-observable-subscribe
            const { data } = await NetworkService
                .getInstance()
                .get(Routes.BinauralBeats)

            const binauralBeatStates = new BinauralBeatsList(
                data.binauralBeatStates).binauralBeatStates
            setBinauralBeatStates(binauralBeatStates)
        })()
    }, [])

    return (
        <Slide direction="right" in={binauralBeatStates.length > 0} mountOnEnter unmountOnExit>
            <Grid className={classes.root} container spacing={2}> {
                binauralBeatStates.map((binauralBeatState: BinauralBeatState, index) => {
                    return (
                        <Grid
                            key={binauralBeatState.id}
                            item
                            xs={12}
                            sm={12}
                            lg={4}>
                            <BinauralBeatStateCard
                                index={index}
                                loaded={binauralBeatStates.length > 0}
                                binauralBeatState={binauralBeatState}/>
                        </Grid>
                    )
                })
            }
            </Grid>
        </Slide>
    )

}

export default BinauralBeatsScreen