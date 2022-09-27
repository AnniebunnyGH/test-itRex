import { Router } from "express";
import StoreController from "./StoreController";

export default (router: Router) => {
    router.route('/store/:key')
        .get(StoreController.getValue)
        .post(StoreController.setValue)
        .delete(StoreController.deleteKey)
}