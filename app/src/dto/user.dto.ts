import { IsEmail, IsEmpty, isNotEmpty, IsNotEmpty, IsString } from "class-validator";
/**
 * @swagger
 * components:
 *   schemas:
 *     SignInBodyDto:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Username
 *           example: "alice"
 *         password:
 *           type: string
 *           description: Password
 *           example: "123"
 */
export class SignInBodyDto {
    @IsString({ message: 'Username must be a string' })
    @IsNotEmpty({ message: 'Username must have a value' })
    username!: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password must have a value' })
    password!: string;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpBodyDto:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Username
 *           example: "alice"
 *         email:
 *           type: string
 *           description: User's email address
 *           format: email
 *           example: "alice@gmail.com"
 *         password:
 *           type: string
 *           description: User's password
 *           example: "123"
 */
export class SignUpBodyDto {
    @IsString({ message: 'Username must be a string' })
    @IsNotEmpty({ message: 'Username must have a value' })
    username!: string;

    @IsString({ message: 'Email must be a string' })
    @IsNotEmpty({ message: 'Email must have a value' })
    email!: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password must have a value' })
    password!: string;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     VerifyOtpBodyDto:
 *       type: object
 *       required:
 *         - username
 *         - otp
 *       properties:
 *         username:
 *           type: string
 *           description: Username to verify
 *           example: "alice"
 *         otp:
 *           type: string
 *           description: One-time password (OTP) code sent to user's email
 *           example: "123456"
 */
export class VerifyOtpBodyDto {
    @IsString({ message: 'Username must be a string' })
    @IsNotEmpty({ message: 'Missing user id' })
    username!: string;

    @IsString({ message: 'OTP must be a string' })
    @IsNotEmpty({ message: 'Missing OTP' })
    otp!: string;
}

