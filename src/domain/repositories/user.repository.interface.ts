import { IBaseRepository } from './base.repository.interface';
import { User } from '../entities/user.entity';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByEmailWithPassword(email: string): Promise<User | null>;
  findActiveUsers(): Promise<User[]>;
  verifyEmail(userId: string): Promise<void>;
}
