import User from "../Models/User";
import NetworkService from "../Network/NetworkService";
import Routes from "../Network/Routes";

const CurrentUser = async (): Promise<User> => {
    const userResponse = await NetworkService
        .getInstance()
        .get(
            Routes.ShowUser
        )
    return User.fromJson(userResponse)
}

export default CurrentUser