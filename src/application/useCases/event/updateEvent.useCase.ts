import { Injectable } from '@nestjs/common';
import { UpdateEventService } from '../../services/event/updateEvent.service';
import { UpdateEventDto } from '../../../interfaces/dtos';

@Injectable()
export class UpdateEventUseCase {
  constructor(private readonly service: UpdateEventService) {}

  async execute(id: string, dto: UpdateEventDto) {
    return this.service.execute(id, dto);
  }
}
