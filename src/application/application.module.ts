import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../infrastructure/database/repositories/repositories.module';
import {
  CreateUserService,
  CreateEventService,
  ListUpcomingEventsService,
  GetEventBySlugService,
  UpdateEventService,
} from './services';
import {
  CreateUserUseCase,
  CreateEventUseCase,
  ListUpcomingEventsUseCase,
  GetEventBySlugUseCase,
  UpdateEventUseCase,
} from './useCases';

@Module({
  imports: [RepositoriesModule],
  providers: [
    CreateUserUseCase,
    CreateUserService,
    CreateEventUseCase,
    CreateEventService,
    ListUpcomingEventsService,
    ListUpcomingEventsUseCase,
    GetEventBySlugService,
    GetEventBySlugUseCase,
    UpdateEventService,
    UpdateEventUseCase,
  ],
  exports: [
    CreateUserUseCase,
    CreateUserService,
    CreateEventUseCase,
    CreateEventService,
    ListUpcomingEventsService,
    ListUpcomingEventsUseCase,
    GetEventBySlugService,
    GetEventBySlugUseCase,
    UpdateEventService,
    UpdateEventUseCase,
  ],
})
export class ApplicationModule {}
