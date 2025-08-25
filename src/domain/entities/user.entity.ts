import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
@Index(['email'], { unique: true })
export class User extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255, select: false })
  password: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ type: 'jsonb', nullable: true })
  profile?: Record<string, any>;
}
