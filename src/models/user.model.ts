import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { RoleEnum } from "../enums/role.enum";
import { string } from "joi";

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            enum: RoleEnum,
            type: string,
            required: true,
            default: RoleEnum.USER,
        },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        age: { type: Number, required: true },
        isDeleted: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false },
);

export const User = model<IUser>("user", userSchema);
