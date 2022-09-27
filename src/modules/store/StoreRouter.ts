import { Router } from "express";
import StoreController from "./StoreController";

export default (router: Router) => {
    router.route('/store/:key')
        .get((req, res) => StoreController.getValue(req, res))
        .post((req, res) => StoreController.setValue(req, res))
        .delete((req, res) => StoreController.deleteKey(req, res))
}