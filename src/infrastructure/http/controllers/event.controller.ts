import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateEventUseCase,
  ListUpcomingEventsUseCase,
  GetEventBySlugUseCase,
  UpdateEventUseCase,
  DeleteEventUseCase,
} from '../../../application/useCases';
import {
  CreateEventDto,
  ListUpcomingEventsDto,
  GetEventBySlugParamsDto,
  UpdateEventDto,
} from '../../../interfaces/dtos';

@Controller('events')
export class EventController {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly listUpcomingEventsUseCase: ListUpcomingEventsUseCase,
    private readonly getEventBySlugUseCase: GetEventBySlugUseCase,
    private readonly updateEventUseCase: UpdateEventUseCase,
    private readonly deleteEventUseCase: DeleteEventUseCase,
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

  @Get(':slug')
  async getBySlug(@Param() params: GetEventBySlugParamsDto) {
    const data = await this.getEventBySlugUseCase.execute(params.slug);
    return {
      success: true,
      data,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    const data = await this.updateEventUseCase.execute(id, dto);
    return {
      success: true,
      data,
      message: 'Evento atualizado com sucesso',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteEventUseCase.execute(id);
    return {
      success: true,
      message: 'Evento removido com sucesso',
    };
  }
}
