import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../../infrastructure/database/repositories/event/event.repository';
import {
  BusinessErrorCode,
  BusinessException,
} from 'src/infrastructure/exceptions';
import { Event, EventStatus } from '../../../domain/entities/event.entity';

export interface CreateEventInput {
  name: string;
  description: string;
  slug: string;
  thumbnail?: string;
  banner?: string;
  startAt: Date;
  endAt: Date;
  startSaleAt: Date;
  endSaleAt: Date;
  openDoorAt?: Date;
  isPublic?: boolean;
  showWebsite?: string;
  status?: EventStatus;
}

export interface CreateEventResponse {
  id: string;
  name: string;
  slug: string;
  status: EventStatus;
  createdAt: Date;
}

@Injectable()
export class CreateEventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(data: CreateEventInput): Promise<CreateEventResponse> {
    const existing = await this.eventRepository.findBySlug(data.slug);
    if (existing) {
      throw BusinessException.create(
        BusinessErrorCode.RESOURCE_ALREADY_EXISTS,
        'createEvent',
        { resource: 'Evento' },
      );
    }

    const payload: Partial<Event> = {
      name: data.name,
      description: data.description,
      slug: data.slug,
      thumbnail: data.thumbnail,
      banner: data.banner,
      startAt: data.startAt,
      endAt: data.endAt,
      startSaleAt: data.startSaleAt,
      endSaleAt: data.endSaleAt,
      openDoorAt: data.openDoorAt,
      isPublic: data.isPublic ?? true,
      showWebsite: data.showWebsite,
      status: data.status ?? EventStatus.DRAFT,
    };

    const created = await this.eventRepository.create(payload);
    return {
      id: created.id,
      name: created.name,
      slug: created.slug,
      status: created.status,
      createdAt: created.createdAt,
    };
  }
}
