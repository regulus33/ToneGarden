import {createContext, useContext} from 'react';

export type UseWhiteNoiseContextType = {
    useWhiteNoise: boolean,
    setUseWhiteNoise: (useWhiteNoise: boolean) => void
}

export const UseWhiteNoiseContext = createContext<UseWhiteNoiseContextType>({
    useWhiteNoise: true,
    setUseWhiteNoise: (useWhiteNoise) => {},
});
export const useWhiteNoiseCtx = () => useContext(UseWhiteNoiseContext)