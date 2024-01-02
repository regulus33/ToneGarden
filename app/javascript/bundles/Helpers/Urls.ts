import Environment from "./Environment";


const DEV_ROOT = "http://localhost:3000/"
const PROD_ROOT = "https://wwww.tonegarden.io/"

export default function Build(path: string):string {
    const env = Environment()

    switch (env) {
        case "development":
            return DEV_ROOT + path
        case "production":
            return PROD_ROOT + path
        default:
            throw "unexpected Environment in Urls()"
    }
}