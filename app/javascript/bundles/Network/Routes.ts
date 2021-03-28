enum RoutesMap {
    NewUser="/users",
    Login="/login",
    Presets="/api/presets",
    PresetShow="/api/preset_show"
}

class Routes  {
    public static get NewUser(): string {
       return RoutesMap.NewUser;
    }

    public static get Login(): string{
        return RoutesMap.Login;
    }

    public static get Presets(): string {
        return RoutesMap.Presets;
    }
    public static PresetShow(id: string): string {
        return RoutesMap.PresetShow + '/' + id;
    }
    }


export default Routes