import BinauralBeatState from "../Types/BinauralBeatTypes";

export default class BinauralBeatsList {

    binauralBeatStates: Array<BinauralBeatState>;

    constructor(binauralBeatsJson: Array<BinauralBeatState>) {
        this.binauralBeatStates = this.createBinauralBeatStates(binauralBeatsJson)
    }

    createBinauralBeatStates(binauralBeatStates: Array<BinauralBeatState>) : Array<BinauralBeatState> {
        return binauralBeatStates
    }
}