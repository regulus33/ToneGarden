export enum LocalStorageType {
    true = 'true',
    false = 'false',
    auth_key = 'whitenois_gen_is_auth',
    token_key = 'whitenoise_gen_token',
    cache_key = 'cache_bust',
}

export default class LocalStorageService {
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

    public static setBustCache(value) {
        return localStorage.setItem(LocalStorageType.cache_key, value)
    }
    public static getBustCache() {
        return localStorage.getItem(LocalStorageType.cache_key)
    }

}
