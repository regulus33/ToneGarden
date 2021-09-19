enum RoutesMap {
    NewUser = "/users",
    Login = "/users/login",
    BinauralBeats = "/api/binaural_beats",
    Guest = "/users/guest",
}

enum ReactRoutesMap {
    Root = '/',
    BinauralBeatEditScreen = "/preset_show",
    SignupScreen = "/signup",
    SigninScreen = "/signin",
    GuestTokenScreen = '/guest',
    BinauralBeatsScreen = '/presets',
    BinauralBeatsCreateScreen = '/create',
    ErrorScreen = '/whoops',
}

class Routes {

    // Api routes
    public static get NewUser(): string {
        return RoutesMap.NewUser
    }

    public static get ShowUser(): string {
        return  RoutesMap.NewUser
    }

    public static get UpdateUser(): string {
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

    public static BinauralBeatUpdate(id: string): string {
        return Routes.BinauralBeatShow(id)
    }

    public static BinauralBeatDelete(id: string): string {
        return Routes.BinauralBeatShow(id)
    }

    public static get BinauralBeatCreate(): string {
        return RoutesMap.BinauralBeats
    }

    public static get Guest(): string {
        return RoutesMap.Guest
    }

    //  React router routes

    public static get Root(): string {
        return ReactRoutesMap.Root
    }

    public static BinauralBeatEditScreen(id: string) {
        return ReactRoutesMap.BinauralBeatEditScreen + '/' + id
    }

    public static get SignupScreen() {
        return ReactRoutesMap.SignupScreen
    }

    public static get SigninScreen() {
        return ReactRoutesMap.SigninScreen
    }

    public static get GuestTokenScreen() {
        return ReactRoutesMap.GuestTokenScreen
    }

    public static get BinauralBeatsScreen() {
        return ReactRoutesMap.BinauralBeatsScreen
    }

    public static get BinauralBeatsCreateScreen() {
        return ReactRoutesMap.BinauralBeatsCreateScreen
    }

    public static get ErrorScreen() {
        return ReactRoutesMap.ErrorScreen
    }
}

export default Routes





