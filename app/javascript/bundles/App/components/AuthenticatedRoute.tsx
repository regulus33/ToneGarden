import {Component, FunctionComponent} from "react";
import {Route, Redirect} from 'react-router-dom';
import * as React from "react";
import {useAuthenticated} from "../../State/AuthContext";

interface Props {
    component: FunctionComponent,
    path: string,
    title: string,
    keyProp: string,
}

const AuthenticatedRoute: FunctionComponent<Props> = (props) => {
    const {component: Component, path, title, keyProp} = props
    const {authenticated} = useAuthenticated();

    return(
        <Route
            key={keyProp}
            exact path={    path}
            title={title}
            render={props =>
                authenticated ? <Component {...props}/> : <Redirect to={"/signin"}/>
            }/>
    )
}

export default AuthenticatedRoute