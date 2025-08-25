import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../infrastructure/database/repositories/repositories.module';
import {
  CreateUserService,
  CreateEventService,
  ListUpcomingEventsService,
  GetEventBySlugService,
  UpdateEventService,
  DeleteEventService,
} from './services';
import {
  CreateUserUseCase,
  CreateEventUseCase,
  ListUpcomingEventsUseCase,
  GetEventBySlugUseCase,
  UpdateEventUseCase,
  DeleteEventUseCase,
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
    DeleteEventService,
    DeleteEventUseCase,
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
    DeleteEventService,
    DeleteEventUseCase,
  ],
})
export class ApplicationModule {}
