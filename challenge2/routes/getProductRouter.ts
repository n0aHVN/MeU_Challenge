import { Request, Response, Router } from "express";
import { getPgClient } from "../db/pgClient";
import { RacketController } from "../controllers/RacketController";
const getProductRouter = Router();

getProductRouter.get('/hello', (req, res)=>{
    console.log("Hello");
    res.send("HelloWorld");
});

getProductRouter.get('/api/product',async (req: Request, res: Response)=>{
    const data = await RacketController.getRackets();
    res.send(data);
});

export {getProductRouter};