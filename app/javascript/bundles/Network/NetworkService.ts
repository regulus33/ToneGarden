import Headerz from './Headerz'
import {Dispatch} from "react";
import GlobalError from "../Models/GlobalError";
import SecureStorageService from "./SecureStorageService";

type RawResponse = {
    status: number,
}

export default class NetworkService {
    private static baseUrl: string = 'http://localhost:3000';

    private static instance: NetworkService;

    public setAuthenticated: Dispatch<boolean>
    public setError: Dispatch<GlobalError>

    private constructor() {}
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
        this.notifyAuthContext(rawResponse)
        const json = await rawResponse.json();
        return {ok: rawResponse.ok, ...json}
    }

    public async put(route: string, body: Object) {
        const headers = new Headerz(route).deliver();
        const rawResponse = await fetch(`${NetworkService.baseUrl}/${route}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body)})
        this.notifyAuthContext(rawResponse)
        const json = await rawResponse.json();
        return {ok: rawResponse.ok, ...json}
    }

    public async get(route: string) {
        let url = `${NetworkService.baseUrl}/${route}`

        const headers = new Headerz(route).deliver();
        const rawResponse = await fetch(url, {
            method: 'GET',
            headers
        })
        console.warn(`Processing GET to ${url} headers:`, headers)
        await this.notifyAuthContext(rawResponse)
        return await rawResponse.json()
    }

    private notifyAuthContext(response: RawResponse){
        console.log(response.status)
        switch (response.status) {
            case 401:
                this.setAuthenticatedAndStore(false)
                this.setError(new GlobalError(null,response.status, null))
                break
            case 400:
                this.setError(new GlobalError('Email alrready taken.', response.status, null))
                break
            case 200:
                this.setAuthenticatedAndStore(true)
                this.setError(null)
                break
            case 201:
                this.setAuthenticatedAndStore(true)
                this.setError(null)
                break
        }
    }

    setAuthenticatedAndStore(value: boolean) {
        this.setAuthenticated(value)
        return SecureStorageService.setIsAuth(value)
    }
}
