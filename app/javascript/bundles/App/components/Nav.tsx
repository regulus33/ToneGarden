import * as React from 'react';
import { FunctionComponent } from 'react'
import { classList } from "../../Helpers/ViewHelper";

interface Props {
    // todo
}

const Nav: FunctionComponent<Props> = (props) => {
    const [theme] = React.useState();
    return(
        <div className={classList(['nav'], theme)}>
            {props.children}
        </div>
    )
}

export default Nav