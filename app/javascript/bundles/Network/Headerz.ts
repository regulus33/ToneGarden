import Routes from './Routes';
import LocalStorageService from "./LocalStorageService";
class Headerz {
    private static base = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    private static notPasswordProtected: string[] = [Routes.NewUser, Routes.Login]

    private headerz: HeadersInit = Headerz.base;

     constructor() {
       //Bearer token will be null that should be ok for unprotected routes
       this.headerz['Authorization'] = 'Bearer ' + LocalStorageService.getToken();
    }

    public build(){
        return this.headerz
    }

}

export default Headerz