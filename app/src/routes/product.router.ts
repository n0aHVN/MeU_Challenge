import { Request, Response, Router } from "express";
import { RacketController } from "../controllers/racket.controller";
import { IRacketModel } from "../models/racket.model";
import { CheckAuthMiddleware } from "../middlewares/check-auth";
import { RequestValidatorMiddleware } from "../middlewares/request-validator";
import { CreateRacketBodyDto, DeleteRacketParamDto, PutRacketBodyDto, PutRacketParamDto } from "../dto/product.dto";
import { NotFoundError } from "../errors/not-found.error";

const productRouter = Router();

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all rackets
 *     description: Returns a list of all available racket products
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: Successful operation - returns an array of rackets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Racket'
 *       400:
 *         description: Invalid query parameters
 */
productRouter.get('/api/product',async (req: Request, res: Response)=>{
    const data = await RacketController.getRackets();
    res.send(data);
});
/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new racket (requires login)
 *     tags:
 *       - Product
 *     description: Requires authentication via session cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRacketBodyDto'
 *     responses:
 *       200:
 *         description: Add Racket Successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Add Racket Successfully
 *       400:
 *         description: Bad request (validation or creation failure)
 *       401:
 *         description: Unauthorized
 */
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
        else throw new Error("Cannot Add Racket");
        return;
});
/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update a racket by ID (requires login)
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the racket to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PutRacketBodyDto'
 *     responses:
 *       200:
 *         description: PUT Racket Successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: PUT Racket Successfully
 *       400:
 *         description: Bad request (invalid input or validation failure)
 *       401:
 *         description: Not Authorized
 *       404:
 *         description: Racket not found
 */
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
        else throw new Error("Cannot Put Racket");
        return;
    }
)
/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a racket by ID (requires authentication)
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the racket to delete
 *     responses:
 *       200:
 *         description: Racket deleted successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Delete Racket Successfully"
 *       400:
 *         description: Invalid ID format or validation failure
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Racket not found
 */
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
        else throw new Error("Cannot Delete Racket");
    }
)
export {productRouter};