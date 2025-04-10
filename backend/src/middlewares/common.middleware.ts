import { Request, Response, NextFunction } from "express";
import { isObjectIdOrHexString } from "mongoose";
import { ApiError } from "../errors/api.error";
import { ObjectSchema } from "joi";
import { StatusCodeEnum } from "../enums/status-codes";

class CommonMiddleware {
    public isIdValidate(key: string) {
        return (req: Request, res: Response, next: NextFunction): any => {
            try {
                const id = req.params[key];
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(`${key}: ${id} invalid id`, 400);
                }
                next();
            } catch (e) {
                next(e);            }
        };
    }

    public validateBody(validator: ObjectSchema): any {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                const errorMessage = e.details?.[0]?.message || "Validation error";
                next(new ApiError(errorMessage, 400));
            }
        };
    }

    public isFileExists() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!req.file) {
                    throw new ApiError("No file upload", StatusCodeEnum.BED_REQUEST);
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public query(validator: ObjectSchema): any {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.query = await validator.validateAsync(req.query);
                next();
            } catch (e) {
                next(new ApiError(e.details?.[0]?.message, 400));
            }
        };
    }
}

export const commonMiddleware = new CommonMiddleware();
