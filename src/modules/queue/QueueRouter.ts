import { Router } from "express";
import QueueController from "./QueueController";

export default (router: Router) => {
    router.route('/queue')
        .get(QueueController.getItem)
        .post(QueueController.addItem)
}