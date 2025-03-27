import { IUser, IUserCreateDTO } from "../interfaces/user.interface";
import { ITokenPair } from "../interfaces/token.interface";
import { userService } from "./user.service";
import { passwordService } from "./password.service";
import { userRepository } from "../repositories/user.repository";
import { tokenService } from "./token.service";
import { tokenRepository } from "../repositories/token.repository";
import { ApiError } from "../errors/api.error";
import { StatusCodeEnum } from "../enums/status-codes";
import { IAuth } from "../interfaces/auth.interface";
import { emailService } from "./email.service";
import { emailConstants } from "../constants/email.constants";
import { EmailEnum } from "../enums/email.enum";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { config } from "../configs/config";

class AuthService {
    public async signUp(user: IUserCreateDTO): Promise<{ user: IUser, tokens: ITokenPair }> {
        await userService.isEmailUnique(user.email);
        const password = await passwordService.hashedPassword(user.password);
        const newUser = await userRepository.create({ ...user, password });
        const tokens = tokenService.generateTokens({
            userId: newUser._id,
            role: newUser.role,
        });
        await tokenRepository.create({ ...tokens, _userId: newUser._id });
        const token = tokenService.generateActionToken({
            userId: newUser._id,
            role: newUser.role,
        }, ActionTokenTypeEnum.ACTIVATE);
        await emailService.sendEmail(
            newUser.email,
            emailConstants[EmailEnum.ACTIVATE],
            { name: newUser.name, url: `${config.FRONTEND_URL}/activate/${token}` },
        );
        return { user: newUser, tokens };
    }

    public async signIn(dto: IAuth): Promise<{ user: IUser, tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email);

        if (!user) {
            throw new ApiError("Email or password invalid", StatusCodeEnum.UNAUTHORIZED);
        }
        const isValidPassword = await passwordService.comparePassword(dto.password, user.password);
        if (!user.isActive) {
            throw new ApiError("Account is not active", StatusCodeEnum.FORBIDDEN);
        }
        if (!isValidPassword) {
            throw new ApiError("Invalid email or password", StatusCodeEnum.UNAUTHORIZED);
        }
        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({ ...tokens, _userId: user._id });
        return { user, tokens };
    }

    public async activate(token: string): Promise<IUser> {
        const { userId } = tokenService.verifyToken(token, ActionTokenTypeEnum.ACTIVATE);

        return await userService.updateById(userId, { isActive: true });
    }

    public async recoveryPasswordRequest(user:IUser, ):Promise<void>{
        const token = tokenService.generateActionToken({
            userId: user._id,
            role: user.role,
        }, ActionTokenTypeEnum.RECOVERY);
        const url = `${config.FRONTEND_URL}/auth/recovery/${token}`;
        await emailService.sendEmail(
            user.email,
            emailConstants[EmailEnum.RECOVERY],
            { url },
        );
    }
}

export const authService = new AuthService();
