import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/api.error";
import { StatusCodeEnum } from "../enums/status-codes";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader) {
                throw new ApiError("No token provided", StatusCodeEnum.UNAUTHORIZED);
            }

            const accessToken = authorizationHeader.split(" ")[1];

            if (!accessToken) {
                throw new ApiError("No token provided", StatusCodeEnum.UNAUTHORIZED);
            }

            const tokenPayload = tokenService.verifyToken(accessToken, "access");
            const isTokenExists = await tokenService.isTokenExists(accessToken);

            if (!isTokenExists) {
                throw new ApiError("Invalid token", StatusCodeEnum.UNAUTHORIZED);
            }

            req.res.locals.tokenPayload = tokenPayload;

            next();
        } catch (e) {
            next(e);
        }
    }

}

export const authMiddleware = new AuthMiddleware();
