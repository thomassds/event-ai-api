import { Injectable } from '@nestjs/common';
import { DeleteEventService } from '../../services/event/deleteEvent.service';

@Injectable()
export class DeleteEventUseCase {
  constructor(private readonly service: DeleteEventService) {}

  async execute(id: string): Promise<void> {
    await this.service.execute(id);
  }
}
