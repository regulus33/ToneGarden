import Routes from './Routes';
import SecureStorageService from "./SecureStorageService";
class Headerz {
    private static base = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    private static notPasswordProtected: string[] = [Routes.NewUser, Routes.Login]

    private headerz: HeadersInit = Headerz.base;

     constructor(route:string) {
        if(!Headerz.notPasswordProtected.includes(route)) {
           this.headerz['Authorization'] = 'Bearer ' + SecureStorageService.getToken();
        }
    }

    public build(){
        return this.headerz
    }

}

export default Headerz