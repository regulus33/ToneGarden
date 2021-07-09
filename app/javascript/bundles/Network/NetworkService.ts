import Headerz from './Headerz'
import {Dispatch} from "react";
import GlobalError from "../Models/GlobalError";
import LocalStorageService from "./LocalStorageService";
import FunctionName from "../Utils/FunctionName";
import axios, {AxiosInstance} from "axios";
import {cacheAdapterEnhancer} from 'axios-extensions';

export default class NetworkService {
    private static baseUrl: string = 'http://localhost:3000';
    private static instance: NetworkService;
    private http: AxiosInstance
    public setAuthenticated: Dispatch<boolean>
    public setError: Dispatch<GlobalError>
    public onError: Function

    private constructor() {
        this.http = axios.create({
            // headers: { 'Cache-Control': 'no-cache' },
            // cache will be enabled by default
            adapter: cacheAdapterEnhancer(axios.defaults.adapter)
        });
    }


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

    private async makeRequest(url: string, method: string, body?: object): Promise<object | null> {
        if(!['get', 'post', 'put', 'patch', 'delete'].includes(method)) {
            throw `invalid http method ${method}`
        }
        const options = {
            headers: new Headerz().build(),
            withCredentials: true
        }

        let response
        try {
            switch (method) {
                case 'get':
                    response = await this.http.get(url, options)
                    break
                case 'delete':
                    response = await this.http.delete(url, options)
                    break
                default:
                    response = await this.http[method](url, body, options)
                    break
            }
        } catch(errorMessage) {
            console.log(`[${FunctionName()}]: value of errorMessage: ${errorMessage}`)
            console.log(errorMessage)
            let statusCode
            if(errorMessage.response) {
                statusCode = errorMessage.response.status
            }
            this.processResponse(statusCode, errorMessage)
            return
        }
        this.processResponse(response.status)
        return response
    }

    private processResponse(statusCode?: number, errorMessage?: string) {
        if (errorMessage) {
            this.onError()
        }
        switch (statusCode) {
            case 401:
                this.setAuthenticatedAndStore(false)
                this.setError(new GlobalError(null, statusCode, null))
                break
            case 400:
                this.setError(new GlobalError('Email already taken.', statusCode, null))
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
        LocalStorageService.setIsAuth(value)
    }
}
