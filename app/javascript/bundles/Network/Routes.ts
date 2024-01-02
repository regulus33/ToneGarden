enum RoutesMap {
    NewUser = "/users",
    Login = "/users/login",
    Presets = "/api/presets",
    PresetShow = "/api/preset_show",
    Guest = "/users/guest"
}

class Routes {
    public static get NewUser(): string {
        return RoutesMap.NewUser
    }

    public static get Login(): string {
        return RoutesMap.Login
    }

    public static get Presets(): string {
        return RoutesMap.Presets
    }

    public static PresetShow(id: string): string {
        return RoutesMap.PresetShow + '/' + id
    }

    public static get Guest(): string {
        return RoutesMap.Guest
    }
}


export default Routes