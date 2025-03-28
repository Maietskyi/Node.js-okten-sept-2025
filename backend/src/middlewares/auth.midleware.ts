import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/api.error";
import { StatusCodeEnum } from "../enums/status-codes";
import { tokenService } from "../services/token.service";
import { IRefresh, ITokenPayload } from "../interfaces/token.interface";
import { RoleEnum } from "../enums/role.enum";
import { userService } from "../services/user.service";
import { TokenTypeEnum } from "../enums/token-type.enum";

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

            const tokenPayload = tokenService.verifyToken(accessToken, TokenTypeEnum.ACCESS);
            const isTokenExists = await tokenService.isTokenExists(accessToken, TokenTypeEnum.ACCESS);

            if (!isTokenExists) {
                throw new ApiError("Invalid access token", StatusCodeEnum.UNAUTHORIZED);
            }

            const isActive = await userService.isActive(tokenPayload.userId);

            if (!isActive) {
                throw new ApiError("Account is not active", StatusCodeEnum.FORBIDDEN);
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
            const tokenPayload = tokenService.verifyToken(refreshToken, TokenTypeEnum.REFRESH);
            const isTokenExists = await tokenService.isTokenExists(refreshToken, TokenTypeEnum.REFRESH);

            if (!isTokenExists) {
                throw new ApiError("Invalid refresh token", StatusCodeEnum.FORBIDDEN);
            }

            req.res.locals.tokenPayload = tokenPayload;

            next();
        } catch (e) {
            next(e);
        }
    }

    public isAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { role } = req.res.locals.tokenPayload as ITokenPayload;
            if (role !== RoleEnum.ADMIN) {
                throw new ApiError("No has permission", StatusCodeEnum.FORBIDDEN);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
