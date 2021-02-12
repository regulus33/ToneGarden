import * as React from 'react';
import { FunctionComponent } from 'react';

export interface Props {
    // TODO: what is the proper typing for a callback?
    onSelect: any;
    backgroundColor: string;
    buttonText: string;
}

const noiseButtonStyles = {
    border: "1px solid black",
    height: "4rem",
}

const NoiseButton: FunctionComponent<Props> = (props: Props) => {
    return(
        <div onClick={props.onSelect} style={{...noiseButtonStyles, backgroundColor: props.backgroundColor}}>
            {props.buttonText}
        </div>
    )
}

export default NoiseButton;
