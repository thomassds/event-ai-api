import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../../infrastructure/database/repositories/event/event.repository';
import {
  BusinessErrorCode,
  BusinessException,
} from 'src/infrastructure/exceptions';

@Injectable()
export class DeleteEventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(id: string): Promise<void> {
    const exists = await this.eventRepository.exists(id);
    if (!exists) {
      throw BusinessException.create(
        BusinessErrorCode.RESOURCE_NOT_FOUND,
        'deleteEvent',
        { resource: 'Evento' },
      );
    }
    await this.eventRepository.softDelete(id);
  }
}
