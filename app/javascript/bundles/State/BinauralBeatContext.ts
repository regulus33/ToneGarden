import {createContext, useContext} from 'react';
import BinauralBeat from "../Models/BinauralBeat";

export type BinauralBeatContextType = {
    binauralBeat: BinauralBeat;
    setBinauralBeat: (binauralBeat: BinauralBeat) => void;
}

export const BinauralBeatContext = createContext<BinauralBeatContextType>({
    binauralBeat: BinauralBeat.getInstance(),
    setBinauralBeat: gradient => {}
});
export const useBinauralBeat = () => useContext(BinauralBeatContext)