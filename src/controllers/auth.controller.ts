import { NextFunction, Request, Response } from "express";
import { IUserCreateDTO } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";
import { StatusCodeEnum } from "../enums/status-codes";
import { IAuth } from "../interfaces/auth.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { userService } from "../services/user.service";
import { tokenService } from "../services/token.service";
import { tokenRepository } from "../repositories/token.repository";

class AuthController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as IUserCreateDTO;
            const data = await authService.signUp(body);
            res.status(StatusCodeEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }

    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as IAuth;
            const data = await authService.signIn(dto);
            res.status(StatusCodeEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async me(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPayload = res.locals.tokenPayload as ITokenPayload;
            const { userId } = tokenPayload;
            const user = await userService.getById(userId);
            res.status(StatusCodeEnum.OK).json(user);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.res.locals.tokenPayload as ITokenPayload;
            const tokens = tokenService.generateTokens(payload);
            await tokenRepository.create({ ...tokens, _userId: payload.userId });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();