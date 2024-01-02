import { Component, FunctionComponent } from "react";
import {Route, Redirect} from 'react-router-dom';
import * as React from "react";
import {useAuthenticated} from "../../State/AuthContext";
import {CSSTransition} from 'react-transition-group'

interface Props {
    component: FunctionComponent,
    path: string,
    title?: string,
    keyProp: string,
}

const AuthenticatedRoute: FunctionComponent<Props> = (props) => {
    const { component: Component, path, title, keyProp } = props
    const { authenticated } = useAuthenticated()
    // TODO: this shouldn't be necessary, signup and welcome are rendered from Route not AuthenticatedRoute
    const GUEST_ROUTES = ['/welcome', '/signup']

    const showSignIn = (route: string): boolean => {
        return !authenticated && !GUEST_ROUTES.includes(route)
    }

    return (
        <Route
            key={keyProp}
            exact path={path}
            title={title}>
            {(props) => {
                if (showSignIn(props.location.pathname)) {
                    return (
                        <Redirect to="/signin"/>
                    )
                } else {
                    return (
                        <CSSTransition
                            in={props.match != null}
                            timeout={300}
                            classNames="page"
                            unmountOnExit>
                            <Component {...props}/>
                        </CSSTransition>
                    )
                }
            }}
        </Route>
    )
}

export default AuthenticatedRoute
