import { IsDefined, IsIn, IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateRacketBodyDto {
    @IsDefined({ message: 'Brand is missing!' })
    @IsNotEmpty({ message: 'Brand is required!' })
    brand!: string;

    @IsNotEmpty({ message: 'Racket Name is required!' })
    racket_name!: string;

    @IsNotEmpty({ message: 'Slug is required!' })
    slug!: string;

    @IsNumber(
        {},
        { message: 'Speed Rating must be a number or float' }
    )
    speed_rating!: number;

    @IsNumber(
        {},
        { message: 'Vibration Rating a number or float' })
    vibration_rating!: number;

    @IsNumber({}, { message: 'Must be a number' })
    weight!: number;

    @IsString({ message: 'Must be a string' })
    composition!: string;

    @IsString({ message: 'Racket Size must be a string' })
    racket_size!: string;

    @IsString({ message: 'Thickness must be a string' })
    thickness!: string;

    @IsDefined({ message: 'Price is required' })
    @IsInt({ message: 'price must be a positive integer' })
    @Min(0, { message: 'price must be a positive integer' })
    price!: number;

    @IsDefined({ message: 'Quantity is required' })
    @IsInt({ message: 'Quantity must be a positive integer' })
    @Min(0, { message: 'Quantity must be a positive integer' })
    quantity!: number;

    @IsDefined({ message: 'Status is required' })
    @IsIn(['enable', 'disable'], {
        message: "Status must be either 'enable' or 'disable'",
    })
    status!: 'enable' | 'disable';
}

export class PutRacketBodyDto extends CreateRacketBodyDto{}

export class PutRacketParamDto{
    @IsDefined({ message: 'ID is missing!' })
    @IsNotEmpty({message: 'ID is requried!'})
    id!: string;
}

export class DeleteRacketParamDto{
    @IsDefined({ message: 'ID is missing!' })
    @IsNotEmpty({message: 'ID is requried!'})
    id!: string;
}