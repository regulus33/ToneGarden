type BinauralBeatState = {
    id: number,
    name: string,
    beatOscillator: number,
    carrierOscillator: number,
    volume: number,
    noiseLevel: number,
    editable: boolean,
}

export type BinauralBeatAttributes = {
    attributes: BinauralBeatState
}

export type BinauralBeatData = {
    data: BinauralBeatAttributes
}

export type BinauralBeatJson = {
    binauralBeatState: BinauralBeatData
}

export default BinauralBeatState