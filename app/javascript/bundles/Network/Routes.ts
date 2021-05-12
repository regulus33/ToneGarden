enum RoutesMap {
    NewUser = "/users",
    Login = "/users/login",
    BinauralBeats = "/api/binaural_beats",
    Guest = "/users/guest"
}

class Routes {
    public static get NewUser(): string {
        return RoutesMap.NewUser
    }

    public static get Login(): string {
        return RoutesMap.Login
    }

    public static get BinauralBeats(): string {
        return RoutesMap.BinauralBeats
    }

    public static BinauralBeatShow(id: string): string {
        return RoutesMap.BinauralBeats + '/' + id
    }

    public static get Guest(): string {
        return RoutesMap.Guest
    }
}


export default Routes