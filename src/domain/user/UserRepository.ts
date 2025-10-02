import type { User } from "./User.js";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(email: string, password: string): Promise<User>;
}