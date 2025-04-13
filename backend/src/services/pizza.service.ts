import { IPizza, IPizzaCreateDTO, IPizzaQuery } from "../interfaces/pizza.interface";
import { pizzaRepository } from "../repositories/pizza.repository";
import { IPaginationResponse } from "../interfaces/paginated-response-interface";

class PizzaService {
    public async getAll(query: IPizzaQuery): Promise<IPaginationResponse<IPizza>> {
        const [data, totalItems] = await pizzaRepository.getAll(query);
        const totalPages = Math.ceil(totalItems / query.pageSize);

        return {
            totalItems,
            totalPages,
            prevPage: !!(query.page - 1),
            nextPage: query.page + 1 <= totalPages,
            data,
        };
    }

    public create(pizza: IPizzaCreateDTO): Promise<IPizza> {
        return pizzaRepository.create(pizza);
    };
}


export const pizzaService = new PizzaService();