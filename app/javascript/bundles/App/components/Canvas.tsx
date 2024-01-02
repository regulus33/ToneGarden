import * as React from 'react'
import {FunctionComponent, useEffect, useState} from 'react'

interface Props {
    id: 'carrierCanvas' | 'beatCanvas'
}

const Canvas: FunctionComponent<Props> = (props) => {
    return (
        <canvas id={props.id} style={{width: '100%'}} />
    )
}

export default Canvas