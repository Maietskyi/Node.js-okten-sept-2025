import { IBase } from "./base.interface";
import { RoleEnum } from "../enums/role.enum";

interface IUser extends IBase {
    _id: string;
    email: string;
    password: string;
    role: RoleEnum;
    isDeleted: boolean;
    isActive: boolean;
    isVerified: boolean;
    name: string;
    surname: string;
    age: number;
    avatar: string;
}

type IUserCreateDTO = Pick<IUser, "email" | "password" | "name" | "surname" | "age">;

type IUserUpdateDTO = Pick<IUser, "name" | "surname" | "age">

export type { IUser, IUserCreateDTO, IUserUpdateDTO };