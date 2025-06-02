import { Request, Response, Router } from "express";
import { getPgClient } from "../db/pgClient";
import { RacketController } from "../controllers/RacketController";
import { IRacketModel } from "../models/racket.model";

import {body} from 'express-validator';
import { RequestValidatorMiddleware } from "../middlewares/request-validator";

const validationRules = [
    body("brand")
        .exists()
        .withMessage("Brand is required!")
        .notEmpty()
        .withMessage("Brand is required!"),
    body("racket_name")
        .notEmpty()
        .withMessage("Racket Name is required!"),
    body("speed_rating")
        .isFloat()
        .withMessage("Speed Rating must be a number or float"),
    body("vibration_rating")
        .isFloat()
        .withMessage("Vibration Rating a number or float"),
    body("weight")
        .isNumeric()
        .withMessage("Must be a number"),
    body("composition")
        .isString()
        .withMessage("Must be a string"),
    body('racket_size')
        .isString().withMessage('Racket Size must be a string'),
    body('thickness')
        .isString()
        .withMessage('Thickness must be a string'),
    body('price')
        .exists().withMessage('Price is required')
        .isInt({ min: 0 }).withMessage('price must be a positive integer'),
    body('status')
        .exists().withMessage("Status is required")
        .isIn(['enable', 'disable']).withMessage("Status must be either 'enable' or 'disable")
]

const productRouter = Router();

productRouter.get('/api/product',async (req: Request, res: Response)=>{
    const data = await RacketController.getRackets();
    res.send(data);
});

productRouter.post("/api/product", 
    validationRules,
    RequestValidatorMiddleware,
    async(req: Request, res: Response)=>{
        const data : IRacketModel = req.body;
        const isSuccess = await RacketController.createNewRacket(data);
        if (isSuccess){
            res.status(200).send("Add Racket Successfully");
        }
        return;
})
export {productRouter};