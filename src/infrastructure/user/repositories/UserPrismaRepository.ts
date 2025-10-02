import { User } from '../../../domain/user/User.js';
import { type UserRepository } from '../../../domain/user/UserRepository.js';
import { UserEmail } from '../../../domain/user/value-objects/UserEmail.js';
import { UserId } from '../../../domain/user/value-objects/UserId.js';
import { UserPassword } from '../../../domain/user/value-objects/UserPassword.js';
import { PrismaSingleton } from '../../db/PrismaClient.js';
import { PrismaClient } from '@prisma/client';

type PrismaUser = {
  id: string;
  email: string
  password: string
  createdAt: Date;
  updatedAt: Date;
}

export class UserPrismaRepository implements UserRepository {
  private db: InstanceType<typeof PrismaClient>;

  constructor() {
    this.db = PrismaSingleton.getInstance().prisma;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.user.findFirst({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return this.mapToDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return this.mapToDomain(user);
  }

  async create(email: string, password: string): Promise<User> {
    const newUser = await this.db.user.create({
      data: {
        email,
        password,
      },
    });

    return this.mapToDomain(newUser)
  }

  private mapToDomain(user: PrismaUser): User {
    return new User(
      new UserId(user.id), 
      new UserEmail(user.email), 
      new UserPassword(user.password),
      new Date(user.createdAt),
      new Date(user.updatedAt)
    );
  }
}