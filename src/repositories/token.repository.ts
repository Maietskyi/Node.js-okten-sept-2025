import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepositori {
    public create(dto:any):Promise<IToken> {
        return Token.create(dto);
    }
}