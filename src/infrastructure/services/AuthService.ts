import type { UserTokenPayloadDto } from "../../application/user/dto/UserTokenPayloadDto.js";
import type { JwtAuth } from "../../domain/services/JwtAuth.js";
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
