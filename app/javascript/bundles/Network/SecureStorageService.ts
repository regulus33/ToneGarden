export enum Auth {
    true = 'true',
    false = 'false',
    auth_key = 'whitenois_gen_is_auth',
    token_key = 'whitenoise_gen_token'
}

export default class SecureStorageService {
    // TODO local storage is not that secure

    public static getIsAuth(): boolean {
        return localStorage.getItem(Auth.auth_key) == Auth.true
    }

    public static setIsAuth(value: boolean) {
      return localStorage.setItem(Auth.auth_key, (value.toString() == Auth.true).toString())
    }


    public static getToken(): string{
      return localStorage.getItem(Auth.token_key)
    }

    public static setToken(value){
        return localStorage.setItem(Auth.token_key, value)
    }
}

