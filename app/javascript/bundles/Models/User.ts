export default class User {
    email: string
    token: string
    password: string
    useWhiteNoise: boolean
    useAudioWorklet: boolean

    constructor(email?: string, token?: string, password?: string, useAudioWorklet?: boolean, useWhiteNoise?: boolean) {
        this.email = email
        this.token = token
        this.password = password
        this.useAudioWorklet = useAudioWorklet
        this.useWhiteNoise = useWhiteNoise
    }

    static fromJson(json) {
        // TODO: this is kinda lame. We shouldn't have to dig through so much muck
        // TODO: standardize the ruby json serializers
        const user = JSON.parse(json.data.user).data.attributes
        const instance = new User(
            user.email,
            user.token,
            user.password,
            user.use_audio_worklet,
            user.use_white_noise
        )
        return instance
    }

    toJson() {
        return {
            email: this.email,
            password: this.password,
        }
    }
}


