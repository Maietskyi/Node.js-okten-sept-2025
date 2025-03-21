import { Request, Response, NextFunction } from "express";
import { IUserCreateDTO } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";
import { StatusCodeEnum } from "../enums/status-codes";

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
            const dto = req.body as any;
            const data = await authService.signIn(dto);
            res.status(StatusCodeEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();