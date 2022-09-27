import { Constants } from "../constants"
import { CustomError } from 'src/utils/CustomError';
import { StoreService } from "../StoreService";
import { correctValues, incorrectValues } from "./data/storeService/1.add new key-value";
import { valueWithoutTtl, valueWithTtl } from "./data/storeService/2.get key";

describe('QueueService', () => {
    let service: StoreService

    it('1.add new key-value', async () => {
        service = new StoreService()

        await Promise.all(correctValues.map(async el => {
            await expect(service.setValue(el.key, el.value, el.ttl)).resolves.toBe(undefined)
        }))

        await Promise.all(incorrectValues.map(async el => {
            await expect(service.setValue(el.key, el.value, el.ttl)).rejects.toEqual(new CustomError(Constants.errorCodes.NOT_CORRECT_VALUE))
        }))
    })

    describe('2.get keys', () => {
        service = new StoreService()

        it('2.1.get key', async () => {
            await Promise.all([
                service.setValue(valueWithoutTtl.key, valueWithoutTtl.value),
                service.setValue(valueWithTtl.key, valueWithTtl.value, valueWithTtl.ttl)
            ])
    
            await new Promise(resolve => setTimeout(resolve, valueWithTtl.ttl))
    
            await Promise.all([
                expect(service.getValueByKey(valueWithoutTtl.key)).resolves.toEqual(valueWithoutTtl.value),
                expect(service.getValueByKey(valueWithTtl.key)).resolves.toEqual(null),
            ])
        })

        it('2.2.delete key', async () => {
            await service.deleteKey(valueWithoutTtl.key)
            await expect(service.getValueByKey(valueWithoutTtl.key)).resolves.toEqual(null)
        })
    })
}) 