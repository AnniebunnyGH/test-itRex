import { Constants } from "./constants"
import { IStoreElement } from "./interfaces/IStoreElement"
import { StoreElement } from "./models/StoreElement"

export class StoreService {
    private readonly store: {[k: string]: IStoreElement} = {}

    async getValueByKey(
        key: string
    ) {
        try {
            const storeElement = this.store[key]
            if (!storeElement) return null //throw new CustomError(Constants.errorCodes.KEY_NOT_EXIST)

            return storeElement.getValue()
        } catch(e) {
            if (e?.errorCode == Constants.errorCodes.EXPIRED_KEY) delete this.store[key]

            return null
        }
    }

    async setValue(
        key: string,
        value: any,
        ttl: number = 0
    ) {
        this.store[key] = new StoreElement()
            .setValue(value)
            .setTtl(ttl)
    }

    async deleteKey(
        key: string
    ) {
        delete this.store[key]
    }
}
