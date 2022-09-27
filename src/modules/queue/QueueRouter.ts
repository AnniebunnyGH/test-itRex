import { Router } from "express";
import { queueController } from "./QueueController";

export default (router: Router) => {
    router.route('/queue')
        .get((req, res) => queueController.getItem(req, res))
        .post((req, res) => queueController.addItem(req, res))
}