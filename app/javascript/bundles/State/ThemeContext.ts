import { createContext, useContext } from 'react';

export enum Theme {
    Dark = 'dark',
    Light = 'light',
}

export type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: Theme.Light, setTheme: theme => console.warn('no theme provider')});
export const useTheme = () => useContext(ThemeContext)