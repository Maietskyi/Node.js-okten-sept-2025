import { SubmitHandler, useForm } from "react-hook-form";
import { IPizza } from "../../interfaces/pizzaInterface";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { pizzaActions } from "../../redux/slices/pizzaSlice";

const PizzaCreate = () => {
    const { register, handleSubmit } = useForm<IPizza>();
    const dispatch = useAppDispatch();

    const save: SubmitHandler<IPizza> = async (pizza) => {
        dispatch(pizzaActions.create({ pizza }));
    };

    return (
        <form onSubmit={handleSubmit(save)}>
            <input type="text" placeholder={"name"} {...register("name")} />
            <input type="number" placeholder={"price"} {...register("price")} />
            <input type="number" placeholder={"diameter"} {...register("diameter")} />
            <button>Save</button>
        </form>
    );
};

export { PizzaCreate };