import { Request, Response, Router } from "express";
import { RequestValidatorMiddleware } from "../middlewares/request-validator";
import { UserController } from "../controllers/user.controller";
import jwt from 'jsonwebtoken';
import { CheckAuthMiddleware } from "../middlewares/check-auth";
import { EmailService } from "../services/email.service";
import { OtpController } from "../controllers/otp.controller";
import { SignInBodyDto, SignUpBodyDto, VerifyOtpBodyDto } from "../dto/user.dto";
const userRouter = Router();

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
    });

userRouter.post("/api/user/signup",
    RequestValidatorMiddleware({
        bodyDto: SignUpBodyDto
    }),
    async (req: Request, res: Response) => {
        //Check if username exist
        const { username, email, password } = req.body;
        let isExist = await UserController.ifUsernameExist(username);
        if (isExist) {
            res.status(200).send("User is exist");
            return;
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

userRouter.get("/api/user/check",
    CheckAuthMiddleware,
    (req: Request, res: Response) => {
        res.send("Authorized");
        return;
    });
export { userRouter };