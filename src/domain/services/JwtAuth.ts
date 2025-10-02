import type { UserTokenPayloadDto } from "../../application/user/dto/UserTokenPayloadDto.js";

export interface JwtAuth {
  generateToken(payload: UserTokenPayloadDto): string;
  verifyToken(token: string): UserTokenPayloadDto;
}