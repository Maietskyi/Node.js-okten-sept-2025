import { NextFunction, Request, Response } from "express";
import { pizzaService } from "../services/pizza.service";
import { StatusCodeEnum } from "../enums/status-codes";
import { IPizzaCreateDTO, IPizzaQuery } from "../interfaces/pizza.interface";

class PizzaController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as any as IPizzaQuery;
            const data = await pizzaService.getAll(query);
            res.status(StatusCodeEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const pizza = req.body as IPizzaCreateDTO;
            const data = await pizzaService.create(pizza);
            res.status(StatusCodeEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const pizzaController = new PizzaController();