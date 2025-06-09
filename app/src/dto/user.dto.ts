import { IsEmail, IsEmpty, isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class SignInBodyDto {
    @IsString({ message: 'Username must be a string' })
    @IsNotEmpty({ message: 'Username must have a value' })
    username!: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password must have a value' })
    password!: string;
}

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

export class VerifyOtpBodyDto {
    @IsString({ message: 'Username must be a string' })
    @IsNotEmpty({ message: 'Missing user id' })
    username!: string;

    @IsString({ message: 'OTP must be a string' })
    @IsNotEmpty({ message: 'Missing OTP' })
    otp!: string;
}
