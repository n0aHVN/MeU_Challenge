import { IsDefined, IsIn, IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateRacketBodyDto:
 *       type: object
 *       required:
 *         - brand
 *         - racket_name
 *         - slug
 *         - speed_rating
 *         - vibration_rating
 *         - weight
 *         - composition
 *         - racket_size
 *         - thickness
 *         - price
 *         - quantity
 *         - status
 *       properties:
 *         brand:
 *           type: string
 *           description: Brand of the racket
 *           example: Butterfly
 *         description:
 *           type: string
 *           description: The description of a product
 *           example: This is the description
 *         racket_name:
 *           type: string
 *           description: Name of the racket
 *           example: Fan Zhendong ALC
 *         slug:
 *           type: string
 *           description: Slug identifier for the racket
 *           example: fan-zhendong-alc
 *         speed_rating:
 *           type: number
 *           format: float
 *           description: Speed rating of the racket
 *           example: 11.8
 *         vibration_rating:
 *           type: number
 *           format: float
 *           description: Vibration rating of the racket
 *           example: 10.3
 *         weight:
 *           type: number
 *           format: float
 *           description: Weight of the racket in grams
 *           example: 80
 *         composition:
 *           type: string
 *           description: Composition material of the racket
 *           example:  5 Wood Layers + 2 Arylate Carbon Layers
 *         racket_size:
 *           type: string
 *           description: Size of the racket
 *           example: 157x150mm
 *         thickness:
 *           type: string
 *           description: Thickness of the racket frame
 *           example: 5.8mm
 *         price:
 *           type: integer
 *           description: Price in USD
 *           example: 7000000
 *         quantity:
 *           type: integer
 *           description: Available quantity in stock
 *           example: 50
 *         status:
 *           type: string
 *           description: Status of the racket availability
 *           enum: [enable, disable]
 *           example: enable
 */

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

/**
 * @swagger
 * components:
 *   schemas:
 *     PutRacketBodyDto:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateRacketBodyDto'
 */
export class PutRacketBodyDto extends CreateRacketBodyDto { }

/**
 * @swagger
 * components:
 *      schemas:
 *      PutRacketParamDto:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: The racket ID to update
 *           example: "12345"
 */
export class PutRacketParamDto {
    @IsDefined({ message: 'ID is missing!' })
    @IsNotEmpty({ message: 'ID is requried!' })
    id!: string;
}
/**
 *  @swagger
 *  components:
 *      DeleteRacketParamDto:
 *      type: object
 *      required:
 *        - id
 *      properties:
 *        id:
 *          type: string
 *          description: The racket ID to delete
 *          example: "12345"
 */
export class DeleteRacketParamDto {
    @IsDefined({ message: 'ID is missing!' })
    @IsNotEmpty({ message: 'ID is requried!' })
    id!: string;
}


/**
 * @swagger
 * components:
 *   schemas:
 *     Racket:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the racket
 *           example: 2e9cae62-3308-4b89-b8be-02e9798dc035
 *         brand:
 *           type: string
 *           description: Brand of the racket
 *           example: Butterfly
 *         description:
 *           type: string
 *           description: Description of the racket
 *           example: This is the description
 *         racket_name:
 *           type: string
 *           description: Name of the racket
 *           example: Zhang Jike ALC
 *         slug:
 *           type: string
 *           description: Slugified name of the racket
 *           example: zhang-jike-alc
 *         weight:
 *           type: number
 *           format: float
 *           description: Weight of the racket in grams
 *           example: 82
 *         speed_rating:
 *           type: number
 *           format: float
 *           description: Speed rating of the racket
 *           example: 11.8
 *         vibration_rating:
 *           type: number
 *           format: float
 *           description: Vibration rating of the racket
 *           example: 10.3
 *         composition:
 *           type: string
 *           description: Composition material of the racket
 *           example: 5 Wood Layers + 2 Arylate Carbon Layers
 *         racket_size:
 *           type: string
 *           description: Size of the racket
 *           example: 157x150mm
 *         thickness:
 *           type: string
 *           description: Thickness of the racket
 *           example: 5.8mm
 *         price:
 *           type: integer
 *           description: Price of the racket (e.g., in cents)
 *           example: 8000000
 *         quantity:
 *           type: integer
 *           description: Quantity available in stock
 *           example: 100
 *         status:
 *           type: string
 *           enum: [enable, disable]
 *           description: Availability status of the racket
 *           example: enable
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp of creation
 *           example: 2025-06-10T10:41:45.123Z
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last update
 *           example: 2025-06-10T10:41:45.123Z
 */