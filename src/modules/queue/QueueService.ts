import { CustomError } from "../../utils/CustomError"
import { Constants } from "./constants"
import { IQueueItem } from "./interfaces/IQueueItem"

export class QueueService {
    private readonly queue: IQueueItem[] = []

    async addItem(item: IQueueItem) {
        if (this.validateItem(item)) 
            this.addToQueue(item)
    }

    async getItem() {
        return this.queue.pop()
    }

    private addToQueue(item: IQueueItem) {
        this.queue.push(item)
    }

    private validateItem(item: IQueueItem) {
        if (typeof item === 'string' && Boolean(item))
            return true

        throw new CustomError(Constants.errorCodes.NOT_CORRECT_ITEM)
    }
}