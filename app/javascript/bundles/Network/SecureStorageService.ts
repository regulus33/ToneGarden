export enum SecureStorageType {
    true = 'true',
    false = 'false',
    auth_key = 'whitenois_gen_is_auth',
    token_key = 'whitenoise_gen_token',
    playing_key = 'playing',
    audio_connected_key = 'audio_connected',
}

export default class SecureStorageService {

    public static  setAudioConnected(connected: boolean) {
        localStorage.setItem(SecureStorageType.audio_connected_key, connected.toString())
    }

    public static getAudioConnected():boolean {
        return localStorage.getItem(SecureStorageType.audio_connected_key) === SecureStorageType.true
    }

    public static setIsPlaying(is: boolean) {
        return localStorage.setItem(SecureStorageType.playing_key, is.toString())
    }

    public static getIsPlaying(): boolean {
        return localStorage.getItem(SecureStorageType.playing_key) === SecureStorageType.true
    }

    public static getIsAuth(): boolean {
        return localStorage.getItem(SecureStorageType.auth_key) == SecureStorageType.true
    }

    public static setIsAuth(value: boolean) {
      return localStorage.setItem(SecureStorageType.auth_key, (value.toString() == SecureStorageType.true).toString())
    }


    public static getToken(): string{
      return localStorage.getItem(SecureStorageType.token_key)
    }

    public static setToken(value){
        return localStorage.setItem(SecureStorageType.token_key, value)
    }
}

