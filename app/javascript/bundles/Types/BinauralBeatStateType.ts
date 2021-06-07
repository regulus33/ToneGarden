type BinauralBeatState = {
    id: number,
    name: string,
    playing: boolean,
    beatOscillator: number,
    carrierOscillator: number,
    volume: number,
    noiseLevel: number,
    editable: boolean,
}

export default BinauralBeatState