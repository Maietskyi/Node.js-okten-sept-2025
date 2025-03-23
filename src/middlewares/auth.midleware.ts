import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/api.error";
import { StatusCodeEnum } from "../enums/status-codes";
import { tokenService } from "../services/token.service";
import { IRefresh } from "../interfaces/token.interface";

class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader) {
                throw new ApiError("No access token provided", StatusCodeEnum.UNAUTHORIZED);
            }

            const accessToken = authorizationHeader.split(" ")[1];

            if (!accessToken) {
                throw new ApiError("No access token provided", StatusCodeEnum.UNAUTHORIZED);
            }

            const tokenPayload = tokenService.verifyToken(accessToken, "access");
            const isTokenExists = await tokenService.isTokenExists(accessToken, "accessToken");

            if (!isTokenExists) {
                throw new ApiError("Invalid access token", StatusCodeEnum.UNAUTHORIZED);
            }

            req.res.locals.tokenPayload = tokenPayload;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { refreshToken } = req.body as IRefresh;

            if (!refreshToken) {
                throw new ApiError("No refresh token provided", StatusCodeEnum.FORBIDDEN);
            }
            const tokenPayload = tokenService.verifyToken(refreshToken, "refresh");
            const isTokenExists = await tokenService.isTokenExists(refreshToken, "refreshToken");

            if (!isTokenExists) {
                throw new ApiError("Invalid refresh token", StatusCodeEnum.FORBIDDEN);
            }

            req.res.locals.tokenPayload = tokenPayload;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
