import { Injectable, NotFoundException } from '@nestjs/common';
import { EventRepository } from '../../../infrastructure/database/repositories/event/event.repository';

@Injectable()
export class GetEventBySlugService {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(slug: string) {
    const event = await this.eventRepository.findBySlug(slug);
    if (!event) {
      throw new NotFoundException({
        success: false,
        message: 'Evento não encontrado',
      });
    }
    return event;
  }
}
