// eslint-disable-next-line no-redeclare
import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";
import { StatusCodeEnum } from "../enums/status-codes";
import { IUserQuery, IUserUpdateDTO } from "../interfaces/user.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { ApiError } from "../errors/api.error";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as any as IUserQuery;
            const data = await userService.getAll(query);
            res.status(StatusCodeEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await userService.getById(id);
            res.status(StatusCodeEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = req.body as IUserUpdateDTO;
            const data = await userService.updateById(id, user);
            res.status(StatusCodeEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await userService.deleteById(id);
            res.status(StatusCodeEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }

    public async blockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: userId } = req.params;
            const { userId: myId } = req.res.locals.tokenPayload as ITokenPayload;

            if (userId === myId) {
                throw new ApiError("Not permitted", StatusCodeEnum.FORBIDDEN);
            }

            const data = await userService.blockUser(userId);

            res.status(StatusCodeEnum.OK).json(data);

        } catch (e) {
            next(e);
        }
    }

    public async unBlockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: userId } = req.params;
            const { userId: myId } = req.res.locals.tokenPayload as ITokenPayload;

            if (userId === myId) {
                throw new ApiError("Not permitted", StatusCodeEnum.FORBIDDEN);
            }

            const data = await userService.unBlockUser(userId);

            res.status(StatusCodeEnum.OK).json(data);

        } catch (e) {
            next(e);
        }
    }

    public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
        try {

            const { userId } = req.res.locals.tokenPayload as ITokenPayload;
            const data = await userService.updateById(userId, { avatar: req.file.path });
            res.status(StatusCodeEnum.OK).json(data);

        } catch (e) {
            next(e);
        }
    }

}

export const userController = new UserController();
