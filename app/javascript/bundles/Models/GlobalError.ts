export default class GlobalError {
    public message?: string
    public errorCode?: number
    public stackTrace?: string

    constructor(message?: string, errorCode?: number, stackTrace?: string) {
        this.message = message
        this.errorCode = errorCode
        this.stackTrace = stackTrace
    }

    type():ErrorType {
        if(!this.errorCode) {
            return ErrorType.notAnError
        }
        if(this.isFatal(this.errorCode)) {
            return ErrorType.fatal
        }
        if(this.isClientFault(this.errorCode)) {
            return ErrorType.isClientFault
        }
        return ErrorType.notSure
    }

    isFatal(errorCode: number): boolean {
        return (errorCode < 600 && errorCode > 499)
    }

    isClientFault(errorCode: number): boolean {
        return (errorCode < 500 && errorCode > 399)
    }
}


export enum ErrorType {
    isClientFault,
    fatal,
    notAnError,
    notSure,
}
