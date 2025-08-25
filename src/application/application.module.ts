import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../infrastructure/database/repositories/repositories.module';
import {
  CreateUserService,
  CreateEventService,
  ListUpcomingEventsService,
} from './services';
import {
  CreateUserUseCase,
  CreateEventUseCase,
  ListUpcomingEventsUseCase,
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
  ],
  exports: [
    CreateUserUseCase,
    CreateUserService,
    CreateEventUseCase,
    CreateEventService,
    ListUpcomingEventsService,
    ListUpcomingEventsUseCase,
  ],
})
export class ApplicationModule {}
