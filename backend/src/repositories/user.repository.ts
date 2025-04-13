import { IUser, IUserCreateDTO, IUserQuery } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { FilterQuery } from "mongoose";

class UserRepository {
    public getAll(query: IUserQuery): Promise<[IUser[], number]> {
        const skip = query.pageSize * (query.page - 1);
        const filterObject: FilterQuery<IUser> = { isDeleted: false };

        if (query.search) {
            filterObject.$or = [
                { name: { $regex: query.search, $options: "i" } },
                { surname: { $regex: query.search, $options: "i" } },
            ];
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
            User.find(filterObject).limit(query.pageSize).skip(skip),
            User.find(filterObject).countDocuments(),

        ]);
    }

    public create(user: IUserCreateDTO): Promise<IUser> {
        return User.create(user);
    }

    public getById(userId: string): Promise<IUser> {
        return User.findById(userId);
    }

    public updateById(userId: string, user: Partial<IUser>): Promise<IUser> {
        return User.findByIdAndUpdate(userId, user);
    }

    public deleteById(userId: string): Promise<IUser> {
        return User.findByIdAndDelete(userId);
    }

    public getByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }

    public blockUser(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
    }

    public unBlockUser(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(userId, { isActive: true }, { new: true });
    }
}

export const userRepository = new UserRepository();
