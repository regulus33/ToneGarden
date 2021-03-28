import Headerz from './Headerz'

export default class NetworkService {
    private static baseUrl: string = 'http://localhost:3000';

    private static instance: NetworkService;

    private constructor() {
    }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the NetworkService class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): NetworkService {
        if (!NetworkService.instance) {
            NetworkService.instance = new NetworkService();
        }

        return NetworkService.instance;
    }

    public async post(route: string, body: Object) {
        const headers = new Headerz(route).deliver();
        const rawResponse = await fetch(`${NetworkService.baseUrl}/${route}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)})
        return await rawResponse.json()
    }

    public async get(route: string) {
        let url = `${NetworkService.baseUrl}/${route}`

        const headers = new Headerz(route).deliver();
        const rawResponse = await fetch(url, {
            method: 'GET',
            headers
        })
        console.warn(`Processing GET to ${url} headers:`, headers)
        return await rawResponse.json()
    }


}
