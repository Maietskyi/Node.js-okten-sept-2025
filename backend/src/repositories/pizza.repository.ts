import { IPizza, IPizzaCreateDTO, IPizzaQuery } from "../interfaces/pizza.interface";
import { Pizza } from "../models/pizza.model";
import { FilterQuery } from "mongoose";

class PizzaRepository {
    public getAll(query: IPizzaQuery): Promise<[IPizza[], number]> {
        const skip = query.pageSize * (query.page - 1);
        const filterObject: FilterQuery<IPizza> = {};

        if (query.name) {
            filterObject.name = { $regex: query.name, $options: "i" };
        }

        if (query.price) {
            filterObject.price = query.price;
        }

        if (query.diameter) {
            filterObject.diameter = query.diameter;
        }

        const orderObject = {};
        if (query.order) {
            if (query.order.startsWith("-")) {
                orderObject[query.order.slice(1)] = -1;
            } else {
                orderObject[query.order] = 1;
            }
        }
        return Promise.all([
            Pizza.find(filterObject).limit(query.pageSize).skip(skip),
            Pizza.find(filterObject).countDocuments(),

        ]);
    }

    public create(pizza: IPizzaCreateDTO): Promise<IPizza> {
        return Pizza.create(pizza);
    }
}

export const pizzaRepository = new PizzaRepository();