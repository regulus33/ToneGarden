import {Noise} from "tone";

class NoiseSource {
    toneNoise: Noise
    level: number = 0

    constructor(level?: number) {
        this.toneNoise = new Noise("brown")
        if(level){
            this.level = level
        }
    }
}

export default NoiseSource