import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  CreateEventUseCase,
  ListUpcomingEventsUseCase,
} from '../../../application/useCases';
import {
  CreateEventDto,
  ListUpcomingEventsDto,
} from '../../../interfaces/dtos';

@Controller('events')
export class EventController {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly listUpcomingEventsUseCase: ListUpcomingEventsUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateEventDto) {
    const data = await this.createEventUseCase.execute(dto);
    return {
      success: true,
      data,
      message: 'Evento criado com sucesso',
    };
  }

  @Get('upcoming')
  async listUpcoming(@Query() query: ListUpcomingEventsDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const result = await this.listUpcomingEventsUseCase.execute(page, limit);
    return {
      success: true,
      ...result,
    };
  }
}
