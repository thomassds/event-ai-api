import { Injectable } from '@nestjs/common';
import { GetEventBySlugService } from '../../services/event/getEventBySlug.service';

@Injectable()
export class GetEventBySlugUseCase {
  constructor(private readonly service: GetEventBySlugService) {}

  async execute(slug: string) {
    return this.service.execute(slug);
  }
}
