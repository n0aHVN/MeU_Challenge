import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { RequestValidatorMiddleware } from "../middlewares/request-validator";
import { UserController } from "../controllers/UserController";
import jwt from 'jsonwebtoken';
import cookieSession from "cookie-session";
import { CheckAuthMiddleware } from "../middlewares/check-auth";
const userRouter = Router();

userRouter.post("/api/user/signin", 
    [
        body("username")
            .notEmpty()
            .withMessage("Username is required"),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
    ],
    RequestValidatorMiddleware,   
    async (req: Request, res: Response)=>{
        const {username, password} = req.body;
        const user = await UserController.findUser(username, password);
        if (!user){
            throw new Error("User is not exist");
        }
        const jwtData = {
            username: user.username,
            email: user.email
        }
        const token = jwt.sign(jwtData, process.env.JWT_SECRET!,
            {expiresIn: '15m'}
        );
        req.session = {token: token};
        
        res.status(200).send("Login Successfully");
});

userRouter.post("/api/user/signup",
    [
        body("username")
            .notEmpty()
            .withMessage("Username is required"),
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
    ],
    RequestValidatorMiddleware,
    async (req: Request, res: Response)=>{
        const {username, email, password} = req.body;
        const isSuccess = await UserController.createUser({
            username,
            email,
            password
        });
        if (isSuccess){
            res.status(200).send("Create User Successfully");
        }
        else res.status(200).send("Cannot Create User");

        return;
});

userRouter.get("/api/user/signout",(req: Request, res: Response)=>{
    req.session = null;
    res.status(200).send("Signed Out Successfully");
})

userRouter.get("/api/user/check",
    CheckAuthMiddleware, 
    (req: Request, res: Response)=>{
        res.send("Authorized");
        return;
});
export {userRouter};