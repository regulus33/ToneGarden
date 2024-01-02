import Headerz from './Headerz'
import {Dispatch} from "react";
import GlobalError from "../Models/GlobalError";
import SecureStorageService from "./SecureStorageService";
import axios, {Method} from "axios";

export default class NetworkService {
    private static baseUrl: string = 'http://localhost:3000';

    private static instance: NetworkService;

    public setAuthenticated: Dispatch<boolean>
    public setError: Dispatch<GlobalError>
    public history: any

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

    public post(route: string, data: object) {
        return this.makeRequest(route, 'post', data)
    }

    public put(route: string, data: object): Promise<object> {
      return this.makeRequest(route, 'put', data)
    }

    public get(route: string): Promise<object> {
       return this.makeRequest(route, 'get')
    }

    // NOTE error will make RESPONSE null
    private async makeRequest(route: string, method: Method, data?: object): Promise<object|null> {
        let response
        const options = {
            url: NetworkService.buildUrl(route),
            method: method,
            headers: new Headerz(route).build(),
            withCredentials: true
        }

        data && ( options['data'] = data )

        try {
            response = await axios(options)
            this.handleResponse(response.status)
        } catch {
            this.handleResponse(500)
        }
        return response || null
    }


    private handleResponse(statusCode: number){
        if(statusCode >= 500) {
            this.history.replace('/oops')
        }
        switch (statusCode) {
            case 401:
                this.setAuthenticatedAndStore(false)
                this.setError(new GlobalError(null,statusCode, null))
                break
            case 400:
                this.setError(new GlobalError('Email alrready taken.', statusCode, null))
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

    private static buildUrl(route: string): string {
        return `${NetworkService.baseUrl}/${route}`
    }

    setAuthenticatedAndStore(value: boolean) {
        this.setAuthenticated(value)
        SecureStorageService.setIsAuth(value)
    }
}
