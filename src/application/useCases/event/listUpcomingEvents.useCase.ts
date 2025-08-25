import { Injectable } from '@nestjs/common';
import { ListUpcomingEventsService } from '../../services/event/listUpcomingEvents.service';

@Injectable()
export class ListUpcomingEventsUseCase {
  constructor(private readonly service: ListUpcomingEventsService) {}

  async execute(page?: number, limit?: number) {
    return this.service.execute(page, limit);
  }
}
