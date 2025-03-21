// eslint-disable-next-line no-redeclare
import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";
import { StatusCodeEnum } from "../enums/status-codes";
import { IUserCreateDTO, IUserUpdateDTO } from "../interfaces/user.interface";

class UserController {
    public async getAll(req: Request, res: Response) {
        const data = await userService.getAll();
        res.status(StatusCodeEnum.OK).json(data);
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as IUserCreateDTO;
            const data = await userService.create(user);
            res.status(StatusCodeEnum.CREATED).status(StatusCodeEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }


    public async getById(req: Request, res: Response) {
            const { id } = req.params;
            const data = await userService.getById(id);
            res.status(StatusCodeEnum.OK).json(data);
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

    public async deleteById(req: Request, res: Response) {
        const { id } = req.params;
        await userService.deleteById(id);
        res.status(StatusCodeEnum.NO_CONTENT).end();
    }
}

export const userController = new UserController();
