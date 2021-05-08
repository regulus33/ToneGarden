import {Noise} from "tone";
// MVP 2
class NoiseSource {
    noise: Noise

    constructor() {
        this.noise = new Noise("pink").start();
    }
}