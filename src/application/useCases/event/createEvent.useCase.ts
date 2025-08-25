import { Injectable } from '@nestjs/common';
import { CreateEventService } from '../../services/event/createEvent.service';
import { CreateEventDto } from '../../../interfaces/dtos';

@Injectable()
export class CreateEventUseCase {
  constructor(private readonly createEventService: CreateEventService) {}

  async execute(dto: CreateEventDto) {
    return this.createEventService.execute({
      name: dto.name,
      description: dto.description,
      slug: dto.slug,
      thumbnail: dto.thumbnail,
      banner: dto.banner,
      startAt: new Date(dto.startAt),
      endAt: new Date(dto.endAt),
      startSaleAt: new Date(dto.startSaleAt),
      endSaleAt: new Date(dto.endSaleAt),
      openDoorAt: dto.openDoorAt ? new Date(dto.openDoorAt) : undefined,
      isPublic: dto.isPublic,
      showWebsite: dto.showWebsite,
      status: dto.status,
    });
  }
}
