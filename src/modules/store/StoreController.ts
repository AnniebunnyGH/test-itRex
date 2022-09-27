import { Request, Response } from "express";
import { ResponseData } from "../../utils/ResponseData";
import { StoreService } from './StoreService'

class StoreContorller {
    private readonly storeService = new StoreService()

    async getValue(
        req: Request<{
            key: string
        }>,
        res: Response<ResponseData>
    ) {
        const responseData = new ResponseData() 
        try {
            const storeItem = await this.storeService.getValueByKey(req.params.key)
            responseData.setData(storeItem)
        } catch(e) {
            responseData.setError(e)
        }
        
        res.status(200).send(responseData).end()
    }

    async setValue(
        req: Request<{
            key: string
        }, any, any, {ttl?: string}>,
        res: Response<ResponseData>
    ) {
        const responseData = new ResponseData() 
        try {
            await this.storeService.setValue(req.params.key, req.body, Number(req.query.ttl))
            responseData.setData(null)
        } catch(e) {
            responseData.setError(e)
        }
        
        res.status(200).send(responseData).end()
    }

    async deleteKey(
        req: Request<{
            key: string
        }>,
        res: Response<ResponseData>
    ) {
        const responseData = new ResponseData() 
        try {
            //we can not wait deleting from storage
            this.storeService.deleteKey(req.params.key)
            responseData.setData(null)
        } catch(e) {
            responseData.setError(e)
        }
        
        res.status(200).send(responseData).end()
    }
}


export default new StoreContorller()