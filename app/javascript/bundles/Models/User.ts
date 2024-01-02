export default class User {
    email: string;
    token: string;
    password: string;

    constructor(email: string, token: string, password: string) {
        this.email = email;
        this.token = token;
        this.password = password;
    }

    fromJson(json) {
        console.log('User:fromJson', `json: ${json}`)
        const user = JSON.parse(json)
        this.email = user.email
        this.token = user.token
    }

    toJson() {
        return {
            email: this.email,
            password: this.password,
        }
    }
}


