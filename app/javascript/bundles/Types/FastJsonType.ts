import BinauralBeatState from "./BinauralBeatStateType";

type FastJsonData = {
    attributes: BinauralBeatState,
    id: string,
    type: "binaural_beat"
}

type FastJson = {
    ok: boolean,
    data: FastJsonData
}

export default FastJson