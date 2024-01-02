import {createContext, useContext} from 'react';

export type BinauralBeatState = {
    id: number,
    name: string,
    playing: boolean,
    beatOscillator: number,
    carrierOscillator: number,
    volume: number,
    noiseLevel: number,
    editable: boolean,
}

export const defaultBinauralBeatState = () => {
    return {
        id: 0,
        name: '',
        playing: false,
        beatOscillator: 0,
        carrierOscillator: 0,
        volume: 0,
        noiseLevel: -Infinity,
        editable: false,
    }
}

export type BinauralBeatContextType = {
    binauralBeatState: BinauralBeatState;
    setBinauralBeatState: (binauralBeat: BinauralBeatState) => void;
}

export const BinauralBeatContext = createContext<BinauralBeatContextType>({
    binauralBeatState: defaultBinauralBeatState(),
    setBinauralBeatState: (binauralBeat: BinauralBeatState) => {}
});
export const useBinauralBeat = () => useContext(BinauralBeatContext)
