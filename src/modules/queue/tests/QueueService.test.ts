import { Constants } from "../constants"
import { QueueService } from "../QueueService"
import { queueItems } from "./data/queueService/3.add-get item"
import { correctItems, incorrrectItems } from "./data/queueService/1.adding item validation"
import { CustomError } from 'src/utils/CustomError';

describe('QueueService', () => {
    let service: QueueService

    it('1.adding item validation', async () => {
        service = new QueueService() 

        await Promise.all(correctItems.map(async el => {
            await expect(service.addItem(el)).resolves.toBe(undefined)
        }))

        await Promise.all(incorrrectItems.map(async (el: any) => {
            await expect(service.addItem(el)).rejects.toEqual(new CustomError(Constants.errorCodes.NOT_CORRECT_ITEM))
        }))
    })

    it('2.get item from empty queue', async () => {
        service = new QueueService()

        await expect(service.getItem()).resolves.toBe(undefined)
    })

    it('3.get last item', async () => {
        service = new QueueService()

        await Promise.all(queueItems.map(el => service.addItem(el)))
        
        for (const queueItem of queueItems.reverse()) {
            const currentQueueItem = await service.getItem()
            expect(currentQueueItem).toBe(queueItem)
        }
    })
}) 