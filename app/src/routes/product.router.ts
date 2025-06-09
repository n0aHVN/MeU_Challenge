import { Request, Response, Router } from "express";
import { RacketController } from "../controllers/racket.controller";
import { IRacketModel } from "../models/racket.model";
import { CheckAuthMiddleware } from "../middlewares/check-auth";
import { RequestValidatorMiddleware } from "../middlewares/request-validator";
import { CreateRacketBodyDto, DeleteRacketParamDto, PutRacketBodyDto, PutRacketParamDto } from "../dto/product.dto";

const productRouter = Router();

productRouter.get('/api/product',async (req: Request, res: Response)=>{
    const data = await RacketController.getRackets();
    res.send(data);
});

productRouter.post("/api/product", 
    RequestValidatorMiddleware({
        bodyDto: CreateRacketBodyDto
    }),
    CheckAuthMiddleware,
    async(req: Request, res: Response)=>{
        const data : IRacketModel = req.body;
        const isSuccess = await RacketController.createNewRacket(data);
        if (isSuccess){
            res.status(200).send("Add Racket Successfully");
        }
        else res.status(200).send("Cannot Add Racket");
        return;
});

//api/product/{id}
productRouter.put("/api/product/:id", 
    RequestValidatorMiddleware({
        bodyDto: PutRacketBodyDto,
        paramDto: PutRacketParamDto
    }),
    CheckAuthMiddleware,
    async (req: Request, res: Response)=>{
        const data : IRacketModel = req.body;
        const id = req.params.id;
        const isSuccess = await RacketController.putRacketByID(id, data);
        if (isSuccess){
            res.status(200).send("PUT Racket Successfully");
        }
        else res.status(200).send("Cannot PUT Racket");
        return;
    }
)
productRouter.delete("/api/product/:id",
    RequestValidatorMiddleware({
        paramDto: DeleteRacketParamDto
    }),
    CheckAuthMiddleware,
    async (req: Request, res: Response)=>{
        const id = req.params.id;
        const isSuccess = await RacketController.deleteRacketById(id);
        if (isSuccess){
            res.status(200).send("Delete Racket Sucessfully");
        }
        else res.status(200).send("Cannot Delete Racket");
    }
)
export {productRouter};