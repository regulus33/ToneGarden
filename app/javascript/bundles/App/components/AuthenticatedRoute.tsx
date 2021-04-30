import {Component, FunctionComponent} from "react";
import {Route, Redirect} from 'react-router-dom';
import SignupScreen from "../../SignupScreen/components/SignupScreen";
import * as React from "react";
import {useAuthenticated} from "../../State/AuthContext";

interface Props {
    component: FunctionComponent,
    path: string,
    title: string,
}

const AuthenticatedRoute: FunctionComponent<Props> = (props) => {
    const {component: Component, path, title} = props
    const {authenticated} = useAuthenticated();

    return(
        <Route
            render={props =>
                authenticated ? <Component {...props}/> : <Redirect to={"/signup"}/>
            }
            exact path={path}
            title={title} />
    )
}

export default AuthenticatedRoute