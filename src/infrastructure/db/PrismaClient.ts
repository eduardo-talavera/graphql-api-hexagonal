import { PrismaClient } from '../../generated/prisma';

export class PrismaSingleton {
  private static instance: PrismaSingleton;
  prisma: InstanceType<typeof PrismaClient>;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): PrismaSingleton {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaSingleton();
    }
    return PrismaSingleton.instance;
  }
}