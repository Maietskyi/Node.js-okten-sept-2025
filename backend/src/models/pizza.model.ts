import { model, Schema } from "mongoose";
import { IPizza } from "../interfaces/pizza.interface";

const pizzaSchema = new Schema(
    {
        name: { type: String, require: true },
        price: { type: Number, require: true },
        diameter: { type: Number, require: true },
    },
    { timestamps: true, versionKey: false },
);

export const Pizza = model<IPizza>("pizza", pizzaSchema);