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
    let userInstance
    try {
      const user = JSON.parse(json.data.user).data.attributes
      userInstance = new User(user.email,
        user.token,
        user.password,
        user.use_audio_worklet,
        user.use_white_noise)
    } catch {
      userInstance = new User("",
        "",
        "",
        false,
        false)
    }
    return userInstance
  }

  toJson() {
    return {
      email: this.email,
      password: this.password,
    }
  }
}
