import Preset from './Preset';
export default class PresetsList {

    presets: Array<Preset>;

    constructor(presetsJson: Array<Object>) {
        this.presets = this.createPresets(presetsJson);
    }

    createPresets(presetsJson: Array<Object>) : Array<Preset> {
        return presetsJson.map(function(json) {
            return new Preset(json);
        })
    }
}