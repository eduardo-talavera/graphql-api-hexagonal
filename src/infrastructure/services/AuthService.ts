import type { UserTokenPayloadDto } from "../../application/user/dto";
import type { JwtAuth } from "../../domain/services/JwtAuth";
import jwt from "jsonwebtoken";

export class AuthService implements JwtAuth {
  constructor(private readonly secret: string) {}

  generateToken(payload: UserTokenPayloadDto): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' });
  }

  verifyToken(token: string): UserTokenPayloadDto {
    return jwt.verify(token, this.secret) as UserTokenPayloadDto;
  }
}
