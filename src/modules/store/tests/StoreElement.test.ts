import { Constants } from '#modules/store/constants';
import { StoreElement } from '#modules/store/models/StoreElement';
import { CustomError } from 'src/utils/CustomError';

describe('StoreElement', () => {
    let storeElement: StoreElement

    describe('1.set-get value', () => {
        storeElement = new StoreElement()
        const correctValue = {foo: 'test1', bar: 123}
        const incorrectValue = 2n
        
        it('1.1.set correct value', async () => {
            expect(storeElement.setValue(correctValue)).toBe(storeElement)
        })
    
        it('1.2.error on setting wrong value', async () => {
            expect(() => storeElement.setValue(incorrectValue)).toThrow(Constants.errorCodes.NOT_CORRECT_VALUE)
        })
    
        it('1.3.get value', async () => {
            expect(storeElement.getValue()).toEqual(correctValue)
        })
    })

    describe('2.set-get value with ttl', () => {
        const value = {foo: 'test1', bar: 123}
        const ttl = 100
        storeElement = new StoreElement()
            .setValue(value)
            .setTtl(ttl)
            
        it('2.1.get right after set', () => {
            expect(storeElement.getValue()).toEqual(value)
        })

        it('2.2.get after ttl', async () => {
            await new Promise(resolve => setTimeout(resolve, ttl))
            expect(() => storeElement.getValue()).toThrow(Constants.errorCodes.EXPIRED_KEY)
        })
    })
}) 