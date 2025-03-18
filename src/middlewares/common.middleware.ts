import { Request, Response, NextFunction } from "express";
import { isObjectIdOrHexString } from "mongoose";
import { ApiError } from "../errors/api.error";
import { ObjectSchema } from "joi";

class CommonMiddleware {
    public isIdValidate(key: string) {
        return (req: Request, res: Response, next: NextFunction): any => {
            try {
                const { id } = req.params;
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(`Invalide Id [${key}]`, 400);
                }
            } catch (e) {
                next(new ApiError(e.deletes[0].message, 400));
            }
        };
    }

    public validateBody(validator: ObjectSchema): any {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next()
            } catch (e) {
                next(new ApiError(e.deletes[0].message, 400));
            }
        };
    }
}

export const commonMiddleware = new CommonMiddleware();
