import { Event } from '../entities/event.entity';
import { IBaseRepository } from './base.repository.interface';

export interface IEventRepository extends IBaseRepository<Event> {
  findBySlug(slug: string): Promise<Event | null>;
  findPublicEvents(): Promise<Event[]>;
  findActiveEvents(): Promise<Event[]>;
  findEventsByStatus(status: string): Promise<Event[]>;
  listUpcoming(
    page: number,
    limit: number,
    now?: Date,
  ): Promise<{ data: Event[]; total: number; page: number; limit: number }>;
}
