import { CustomError } from "../../../utils/CustomError";
import { Constants } from "../constants";
import { IStoreElement, IStoreElementValue } from "../interfaces/IStoreElement";

export class StoreElement implements IStoreElement {
    private data: IStoreElementValue
    private expiryDate: number = 0

    constructor() {}

    setValue(data: any) {
        try {
            this.data = JSON.stringify(data)
        } catch (e) {
            throw new CustomError(Constants.errorCodes.NOT_CORRECT_VALUE)
        }

        return this
    }

    setTtl(ttl: number) {
        if (ttl) this.expiryDate = Date.now() + ttl

        return this
    }

    getValue() {
        if (this.expiryDate == 0 || this.expiryDate > Date.now())
            return JSON.parse(this.data)

        throw new CustomError(Constants.errorCodes.EXPIRED_KEY)
    }
}