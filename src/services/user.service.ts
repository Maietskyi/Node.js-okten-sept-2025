import { IUser, IUserCreateDTO, IUserUpdateDTO } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { ApiError } from "../errors/api.error";
import { StatusCodeEnum } from "../enums/status-codes";

class UserService {
    public getAll(): Promise<IUser[]> {
        return userRepository.getAll();
    }

    public create(user: IUserCreateDTO): Promise<IUser> {
        return userRepository.create(user);
    }

    public getById(userId: string): Promise<IUser> {
        return userRepository.getById(userId);
    }

    public updateById(userId: string, user: IUserUpdateDTO): Promise<IUser> {
        return userRepository.updateById(userId, user);
    }

    public deleteById(userId: string): Promise<IUser> {
        return userRepository.deleteById(userId);
    }

    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);
        if (user) {
        throw new ApiError("User is already exists", StatusCodeEnum.BED_REQUEST)
        }
    }
}

export const userService = new UserService();
