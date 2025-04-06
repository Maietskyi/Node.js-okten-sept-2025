import { Request, Response, NextFunction } from "express";
import { pizzaService } from "../services/pizza.service";
import { StatusCodeEnum } from "../enums/status-codes";
import { IPizzaCreateDTO } from "../interfaces/pizza.interface";

class PizzaController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await pizzaService.getAll();
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