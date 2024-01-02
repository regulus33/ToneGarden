import * as React from 'react';
import {FunctionComponent, useEffect, useState} from 'react'
import ContentWrapper from "../../App/components/ContentWrapper";
import NetworkService from "../../Network/NetworkService";
import Routes from "../../Network/Routes";
import {Loader, Segment, Dimmer, List, Container} from "semantic-ui-react";
import Preset from '../../Models/Preset';
import { Link } from 'react-router-dom';
import PresetsList from '../../Models/PresetsList';
interface PresetsScreenProps {
// buttonText: string;
}


const PresetsScreen: FunctionComponent<PresetsScreenProps> = (props) => {
    const [presets, setPresets] = useState([])
    useEffect(()=> {
        NetworkService
            .getInstance()
            .get(Routes.Presets)
            .then(function (json) {
              const presets = new PresetsList(json.presets).presets;
            setPresets(presets);
        })},[])

    if (presets.length > 0) {
        return (
            <Container>
                <List divided relaxed>
                    {
                        presets.map((preset: Preset) => {
                            return(
                                <List.Item>
                                    <div>{preset.rangeSymbol()}</div>
                                    <List.Header as='a'>{ preset.name }</List.Header>
                                    <Link to={`/preset_show/${preset.id}`}>{ preset.name }</Link>
                                    <List.Description as='a'>{preset.rangeString()}</List.Description>
                                </List.Item>
                            )
                        })
                    }
                </List>
            </Container>
        );
    } else {
        return (
            <Container>
                <Segment>
                    <Loader inverted>Loading</Loader>
                </Segment>
            </Container>
        );
    }
}

export default PresetsScreen