import type { Bcrypt } from "../../domain/services/Bcrypt.js";
import bcrypt from "bcrypt";

export class BcryptService implements Bcrypt {

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }
}