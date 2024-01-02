import Headerz from './Headerz'
import {Dispatch} from "react";
import GlobalError from "../Models/GlobalError";
import LocalStorageService from "./LocalStorageService";
import axios, {AxiosInstance} from "axios";
import {cacheAdapterEnhancer} from 'axios-extensions';

export default class NetworkService {
    private static instance: NetworkService;
    private readonly http: AxiosInstance
    private currentUrl: string
    public setAuthenticated: Dispatch<boolean>
    public setError: Dispatch<GlobalError>
    public onServerCrash: Function

    private constructor() {
        this.http = axios.create({
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

    public delete(route: string): Promise<object> {
        return this.makeRequest(route, 'delete')
    }

    private static get useCache(): boolean {
        return LocalStorageService.getBustCache() === 'false'
    }

    private static handleCacheInvalidation(method: 'get' | 'put' | 'post' | 'patch' | 'delete', force?: boolean) {
        if (method != 'get' || force) {
            LocalStorageService.setBustCache(true)
        } else {
            LocalStorageService.setBustCache(false)
        }
    }

    private async makeRequest(url: string, method: 'get' | 'put' | 'post' | 'patch' | 'delete', body?: object): Promise<object | null> {
        this.currentUrl = url

        if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) {
            throw `invalid http method ${method}`
        }

        const options = {
            headers: new Headerz().build(),
            withCredentials: true,
            cache: NetworkService.useCache
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

            // After a successful request either bust or don't bust cache
            NetworkService.handleCacheInvalidation(method)

        } catch (errorMessage) {
            let statusCode
            console.log(errorMessage)
            if (errorMessage.response) {
                statusCode = errorMessage.response.status

                // IF there is a validation errors(s) from server ['message', 'message']
                if (errorMessage.response.data) {
                    if (errorMessage.response.data.errors) {
                        errorMessage = errorMessage
                            .response
                            .data
                            .errors
                            .join("\n")

                    // Go straight to error page if 500
                    } else if(errorMessage.response.status > 499) {
                        return this.onServerCrash()
                    }
                }
            }
            this.processResponse(statusCode, errorMessage)

            // Just for brevity, bust cache if any error happens.
            NetworkService.handleCacheInvalidation(method, true)

        }

        response && this.processResponse(response.status)
        return response
    }

    // Looks at status code and broadcasts a global error ( we never show multiple errors simultaneously)
    private processResponse(statusCode?: number, errorMessage?: string) {
        switch (statusCode) {
            case 401:
                this.setAuthenticatedAndStore(false)
                this.setError(new GlobalError(null, statusCode, null))
                break
            case 200:
                this.setAuthenticatedAndStore(true)
                this.setError(null)
                break
            case 201:
                this.setAuthenticatedAndStore(true)
                this.setError(null)
                break
            default:
                this.setError(new GlobalError(errorMessage, statusCode, null))
        }
    }

    setAuthenticatedAndStore(value: boolean) {
        this.setAuthenticated(value)
        LocalStorageService.setIsAuth(value)
    }
}
