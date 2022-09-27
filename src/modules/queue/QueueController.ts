import { Request, Response } from "express";
import { ResponseData } from "../../utils/ResponseData";
import { IQueueItem } from "./interfaces/IQueueItem";
import { QueueService } from "./QueueService";

class QueueContorller {
    private readonly queueService = new QueueService()

    async getItem(
        req: Request,
        res: Response
    ) {
        const responseData = new ResponseData() 
        try {
            const queueItem = await this.queueService.getItem()
            responseData.setData(queueItem)
        } catch(e) {
            responseData.setError(e)
        }
        
        res.status(200).send(responseData).end()
    }

    async addItem(
        req: Request<{}, any, {item: any}>,
        res: Response
    ) {
        const responseData = new ResponseData() 
        try {
            await this.queueService.addItem(req.body.item)
            responseData.setData(null)
        } catch(e) {
            responseData.setError(e)
        }
        
        res.status(200).send(responseData).end()
    }
}


export const queueController = new QueueContorller()