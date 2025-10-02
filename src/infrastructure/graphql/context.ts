import type { IncomingMessage } from "http";
import { AuthService } from "../services/AuthService.js";
import { UserPrismaRepository } from "../user/repositories/UserPrismaRepository.js";
import { UserUnAuthenticatedError } from "../../domain/user/UserErrors.js";

const authService = new AuthService(process.env.JWT_SECRET!);
const userRepository = new UserPrismaRepository();

export async function buildContext({ req }: { req: IncomingMessage }) {
  const authHeader = req.headers["authorization"] || "";
  let currentUser = null;

  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const payload = authService.verifyToken(token!);
      currentUser = await userRepository.findById(payload.id);
    } catch (err) {
      console.log('Invalid token: ', err);
      throw new UserUnAuthenticatedError();
    }
  }

  return { currentUser };
}
