import { ITokenJwtProvider } from "../../application/interfaces/ITokenJwtProvider";

import { sign, verify } from "jsonwebtoken";
import { SignOptions, JwtPayload } from "jsonwebtoken";

export class TokenJwtProvider implements ITokenJwtProvider{

  sign(payload: Record<string, any>, secret: string, options?: SignOptions): string{

    const acessToken = sign(payload, secret, options);
    return acessToken;
  }

  verify(token: string, secret: string): string | JwtPayload{

    const isValidToken = verify(token, secret);
    return isValidToken;
  }
}
