import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../../infrastructure/database/repositories/event/event.repository';
import {
  BusinessErrorCode,
  BusinessException,
} from 'src/infrastructure/exceptions';
import { Event } from 'src/domain/entities';

@Injectable()
export class UpdateEventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(id: string, data: Partial<Event>) {
    if (data.slug) {
      const existing = await this.eventRepository.findBySlug(data.slug);
      if (existing && existing.id !== id) {
        throw BusinessException.create(
          BusinessErrorCode.CONFLICTING_DATA,
          'updateEvent',
          { conflict: 'slug já utilizado' },
        );
      }
    }

    const updated = await this.eventRepository.update(id, data);

    return updated;
  }
}
