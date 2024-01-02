export default class SecureStorageService {
    // TODO local storage is not ok
    // use a cookie or store in mem with refresh tokens
    public static getToken(){
      return localStorage.getItem('whitenoise_gen_token')
    }

    public static setToken(value){
        return localStorage.setItem('whitenoise_gen_token', value)
    }
}