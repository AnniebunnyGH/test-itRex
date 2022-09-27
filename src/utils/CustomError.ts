export class CustomError extends Error {
    errorCode: string

    constructor(errorCode: string, message?: string) {
        if (message) console.log(`CustomError: ${message}`)
        super(errorCode)

        this.errorCode = errorCode
    }
}