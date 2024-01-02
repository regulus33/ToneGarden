import {createContext, useContext} from 'react';

export type TitleContextType = {
    title: string;
    setTitle: (title: string) => void;
}

export const TitleContext = createContext<TitleContextType>({
    title: 'Default',
    setTitle: title => {}
});
export const useTitle = () => useContext(TitleContext)