import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../../infrastructure/database/repositories/event/event.repository';

@Injectable()
export class ListUpcomingEventsService {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(page = 1, limit = 10) {
    return this.eventRepository.listUpcoming(page, limit);
  }
}
