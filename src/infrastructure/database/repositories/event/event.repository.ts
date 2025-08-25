import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event, EventStatus } from '../../../../domain/entities/event.entity';
import { IEventRepository } from '../../../../domain/repositories/event.repository.interface';
import { DatabaseException } from '../../../exceptions';
import { BaseRepository } from '../base.repository';

@Injectable()
export class EventRepository
  extends BaseRepository<Event>
  implements IEventRepository
{
  constructor(
    @InjectRepository(Event)
    protected readonly repository: Repository<Event>,
  ) {
    super(repository);
  }

  async findBySlug(slug: string): Promise<Event | null> {
    try {
      return await this.repository.findOne({ where: { slug } });
    } catch (error) {
      throw DatabaseException.fromError(error, 'buscar evento por slug');
    }
  }

  async findPublicEvents(): Promise<Event[]> {
    try {
      return await this.repository.find({
        where: { isPublic: true, status: EventStatus.ACTIVE },
        order: { startAt: 'ASC' },
      });
    } catch (error) {
      throw DatabaseException.fromError(error, 'buscar eventos públicos');
    }
  }

  async findActiveEvents(): Promise<Event[]> {
    try {
      return await this.repository.find({
        where: { status: EventStatus.ACTIVE },
        order: { startAt: 'ASC' },
      });
    } catch (error) {
      throw DatabaseException.fromError(error, 'buscar eventos ativos');
    }
  }

  async findEventsByStatus(status: EventStatus): Promise<Event[]> {
    try {
      return await this.repository.find({
        where: { status },
        order: { startAt: 'ASC' },
      });
    } catch (error) {
      throw DatabaseException.fromError(error, 'buscar eventos por status');
    }
  }
}
