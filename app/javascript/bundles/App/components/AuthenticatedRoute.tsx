import {Component, FunctionComponent} from "react";
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

/**
 * @remarks A HOC over Route handling transition animations and redirects for authenticated  user
 * @param component The screen to be rendered
 * @param path The router url
 * @param title Optional title
 * @param keyProp Resolves to `key` when passed to Router (used for re-renders on same route)
 **/

const AuthenticatedRoute: FunctionComponent<Props> = (props) => {
    const { component: Component, path, title, keyProp } = props
    const { authenticated } = useAuthenticated()

    const showSignIn = (route: string): boolean => {
        return !authenticated && route != '/signup'
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
                            <div className="page">
                                <Component {...props}/>
                            </div>
                        </CSSTransition>
                    )
                }
            }}
        </Route>
    )
}

export default AuthenticatedRoute