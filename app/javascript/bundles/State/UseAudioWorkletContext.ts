import {createContext, useContext} from 'react';

export type UseAudioWorkletContextType = {
    useAudioWorklet: boolean,
    setUseAudioWorklet: (useAudioWorklet: boolean) => void
}

export const UseAudioWorkletContext = createContext<UseAudioWorkletContextType>({
    useAudioWorklet: true,
    setUseAudioWorklet: (useAudioWorklet) => {},
});
export const useAudioWorkletCtx = () => useContext(UseAudioWorkletContext)