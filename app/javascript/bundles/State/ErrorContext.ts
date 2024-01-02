import {createContext, useContext} from 'react';
import GlobalError from "../Models/GlobalError";

export type ErrorContextType = {
    error?: GlobalError;
    setError: (error: GlobalError) => void
}

export const ErrorContext = createContext<ErrorContextType>({
    error: null,
    setError: (error: GlobalError) => {}
});

export const useError = () => useContext(ErrorContext)