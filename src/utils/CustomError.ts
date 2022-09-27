export class CustomError extends Error {
    data?: any
    errorCode: string

    constructor(errorCode: string, message?: string) {
        if (message) console.log(`CustomError: ${message}`)
        super(errorCode)

        this.errorCode = errorCode
    }

    
    setData(data: any) {
        this.data = data

        return this
    }
}