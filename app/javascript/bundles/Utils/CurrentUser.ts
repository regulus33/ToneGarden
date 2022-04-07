import User from "../Models/User";
import NetworkService from "../Network/NetworkService";
import Routes from "../Network/Routes";

const CurrentUser = async (): Promise<User> => {
    const userResponse = await NetworkService
        .getInstance()
        .get(
            Routes.ShowUser
        )
    // @ts-ignore
  if(userResponse.status === 200) {
      return User.fromJson(userResponse)
  } else {
    // create an empty user if not authenticated
    return new User("",  "",  "",false, false)
  }
}

export default CurrentUser
