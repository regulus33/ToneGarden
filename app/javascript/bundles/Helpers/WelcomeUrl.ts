import Environment from "./Environment";

const DEVELOPMENT_WELCOME = "http://localhost:3000/welcome"
const PRODUCTION_WELCOME = "https://wwww.localhost:3000/welcome"

export default function WelcomeUrl():string {
    const env = Environment()

    switch (env) {
        case "development":
            return DEVELOPMENT_WELCOME
        case "production":
            return PRODUCTION_WELCOME
        default:
            throw "unexpected Environment in WelcomeUrl()"
    }

}