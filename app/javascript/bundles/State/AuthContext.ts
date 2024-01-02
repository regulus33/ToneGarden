import {createContext, useContext} from 'react';

export type AuthContextType = {
    authenticated: boolean
    setAuthenticated: (authenticated: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
    authenticated: false,
    setAuthenticated: (authenticated) => {},
});
export const useAuthenticated = () => useContext(AuthContext)