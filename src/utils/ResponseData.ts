import { CustomError } from "./CustomError"

export class ResponseData {
    private data: any = null
    private success = false
    private errorCode?: string | null

    constructor() {}

    setData(data: any) {
        this.data = data
        this.success = true

        return this
    }

    setError(error: Error) {
        if (error instanceof CustomError) {
            this.data = error.data ?? null
            this.errorCode = error.errorCode ?? error.message
        } else {
            this.data = null
            this.errorCode = error.message ?? null
        }
        
        this.success = false

        return this
    }
}