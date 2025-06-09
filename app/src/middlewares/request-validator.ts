import { NextFunction, Request, Response } from "express";
import { RequestValidateError } from "../errors/request-validate.error";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { DtoValidationOptions } from "../dto/dto";


export const RequestValidatorMiddleware = (options: DtoValidationOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    const allErrors = [];

if (options.bodyDto) {
      const bodyInstance = plainToInstance(options.bodyDto, req.body);
      const bodyErrors = await validate(bodyInstance);
      if (bodyErrors.length > 0) allErrors.push(...bodyErrors);
      req.body = bodyInstance;
    }

    if (options.paramDto) {
      const paramInstance = plainToInstance(options.paramDto, req.params);
      const paramErrors = await validate(paramInstance!);
      if (paramErrors.length > 0) allErrors.push(...paramErrors);
      (req as any).params = paramInstance;
    }

    if (options.queryDto) {
      const queryInstance = plainToInstance(options.queryDto, req.query);
      const queryErrors = await validate(queryInstance!);
      if (queryErrors.length > 0) allErrors.push(...queryErrors);
      (req as any).query = queryInstance;
    }

    if (allErrors.length > 0) {
      throw new RequestValidateError(allErrors);
    }

    next();
  };
};