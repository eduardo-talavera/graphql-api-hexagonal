import type { UserId } from "../user/value-objects/UserId.js";

export class Task {
  constructor(
    private id: string,
    private userId: UserId,
    private title: string,
    private description: string,
    private completed: boolean,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  get getId(): string {
    return this.id;
  }

  get getUserId(): string {
    return this.userId.value;
  }

  get getTitle(): string {
    return this.title;
  }

  get getDescription(): string {
    return this.description;
  }

  get isCompleted(): boolean {
    return this.completed;
  }

  get getCreatedAt(): Date {
    return this.createdAt;
  }

  get getUpdatedAt(): Date {
    return this.updatedAt;
  }
}