import {createContext, useContext} from 'react';
import BinauralBeat from "../Models/BinauralBeat";

export type BinauralBeatState = {
    playing: boolean,
    beatOscillator: number,
    carrierOscillator: number,
    volume: number,
}

export const defaultBinauralBeatState = () => {
    return {
        playing: false,
        beatOscillator: 0,
        carrierOscillator: 0,
        volume: 0,
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
