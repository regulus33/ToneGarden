export enum LocalStorageType {
    true = 'true',
    false = 'false',
    auth_key = 'whitenois_gen_is_auth',
    token_key = 'whitenoise_gen_token',
    playing_key = 'playing',
    audio_connected_key = 'audio_connected',
}

export default class LocalStorageService {

    public static  setAudioConnected(connected: boolean) {
        localStorage.setItem(LocalStorageType.audio_connected_key, connected.toString())
    }

    public static getAudioConnected():boolean {
        return localStorage.getItem(LocalStorageType.audio_connected_key) === LocalStorageType.true
    }

    public static getIsAuth(): boolean {
        return localStorage.getItem(LocalStorageType.auth_key) == LocalStorageType.true
    }

    public static setIsAuth(value: boolean) {
      return localStorage.setItem(LocalStorageType.auth_key, (value.toString() == LocalStorageType.true).toString())
    }


    public static getToken(): string{
      return localStorage.getItem(LocalStorageType.token_key)
    }

    public static setToken(value){
        return localStorage.setItem(LocalStorageType.token_key, value)
    }
}

