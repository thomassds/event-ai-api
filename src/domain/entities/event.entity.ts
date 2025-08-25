import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum EventStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  FINISHED = 'FINISHED',
}

@Entity('events')
export class Event extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  thumbnail: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  banner: string;

  @Column({ type: 'timestamp', nullable: false })
  startAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  endAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  startSaleAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  endSaleAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  openDoorAt: Date;

  @Column({ type: 'boolean', default: true })
  isPublic: boolean;

  @Column({ type: 'varchar', length: 500, nullable: true })
  showWebsite: string;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.DRAFT,
  })
  status: EventStatus;
}
