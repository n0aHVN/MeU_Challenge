import { Request, Response, Router } from "express";
import { RequestValidatorMiddleware } from "../middlewares/request-validator";
import { UserController } from "../controllers/user.controller";
import jwt from 'jsonwebtoken';
import { CheckAuthMiddleware } from "../middlewares/check-auth";
import { EmailService } from "../services/email.service";
import { OtpController } from "../controllers/otp.controller";
import { SignInBodyDto, SignUpBodyDto, VerifyOtpBodyDto } from "../dto/user.dto";
const userRouter = Router();

/**
 * @swagger
 * /api/user/signin:
 *   post:
 *     summary: Sign in a user and return a JWT token in session
 *     tags:
 *       - User
 *     requestBody:
 *       description: User credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInBodyDto'
 *     responses:
 *       200:
 *         description: Login Successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Login Successfully
 *       400:
 *         description: Bad request (validation failed)
 *       401:
 *         description: Unauthorized – invalid username or password
 */

userRouter.post("/api/user/signin",
    RequestValidatorMiddleware({
        bodyDto: SignInBodyDto
    }),
    async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const user = await UserController.findUser(username, password);
        if (!user) {
            throw new Error("User is not exist");
        }
        const jwtData = {
            username: user.username,
            email: user.email
        }
        const token = jwt.sign(jwtData, process.env.JWT_SECRET!,
            { expiresIn: '15m' }
        );
        req.session = { token: token };
        req.currentUser = jwtData;
        res.status(200).send("Login Successfully");
    }
);
/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Sign up a user and save to "otp" db
 *     tags:
 *       - User
 *     requestBody:
 *       description: User information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpBodyDto'
 *     responses:
 *       200:
 *         description: Sign Up Successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Login Successfully
 *       400:
 *         description: Bad request (Request validation failed)
 */
userRouter.post("/api/user/signup",
    RequestValidatorMiddleware({
        bodyDto: SignUpBodyDto
    }),
    async (req: Request, res: Response) => {
        //Check if username exist
        const { username, email, password } = req.body;
        let isExist = await UserController.ifUsernameExist(username);
        if (isExist) {
            throw new Error("User is exist");
        }

        //Check if username exists in OTP
        isExist = await OtpController.ifUsernameExist(username);
        if (isExist){
            OtpController.deleteOtp(username);
        }

        //Create an User and save in "otp" table
        const otpCode = await EmailService.generateOTP();
        let isSuccess = await OtpController.addOtp({
            username,
            email,
            password,
            otp: otpCode
        });
        if (!isSuccess) {
            throw new Error("Cannot create User");
        }

        //Send Email
        EmailService.sendOTPEmail(email, otpCode);
        res.status(200).send("Check your email for verification");
        return;
    });

/**
 * @swagger
 * /api/user/signout:
 *   get:
 *     summary: Sign out a user
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Signout Successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Login Successfully
 */

userRouter.get("/api/user/signout", (req: Request, res: Response) => {
    req.session = null;
    res.status(200).send("Signed Out Successfully");
});

userRouter.post("/api/user/verify/:username",
    RequestValidatorMiddleware({
        bodyDto: VerifyOtpBodyDto
    }),
    async (req: Request, res: Response) => {
        const { username } = req.params;
        const otpCode  = req.body.otp;
        const user = await OtpController.getOtp({username, otp: otpCode});
        const currentTime = new Date(Date.now());
        if (!user) {
            throw new Error("Username or OTP is not correct");
        }
        else if (currentTime > user.expiredAt!) {
            throw new Error("OTP is expired");
        }
        //Delete OTP and update user
        let isSuccess = await OtpController.deleteOtp(username);
        if (!isSuccess) {
            throw new Error("Cannot Verify OTP");
        }
        //Create a Verified User
        isSuccess = await UserController.createUser({
            username: user.username,
            email: user.email,
            password: user.password
        });
        if (!isSuccess) {
            throw new Error("Cannot Verify OTP");
        }

        res.status(200).send("Verify Successfully");
    }
)
/**
 * @swagger
 * /api/user/check:
 *   get:
 *     summary: Check if user is authorized
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User is authorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Authorized
 *       401:
 *         description: User is not authorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Not Authorized
 */
userRouter.get("/api/user/check",
    CheckAuthMiddleware,
    (req: Request, res: Response) => {
        res.send("Authorized");
        return;
    });
export { userRouter };