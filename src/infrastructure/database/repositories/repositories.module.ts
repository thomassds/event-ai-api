import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Event } from '../../../domain/entities/event.entity';
import { UserRepository } from './user/user.repository';
import { EventRepository } from './event/event.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Event])],
  providers: [UserRepository, EventRepository],
  exports: [UserRepository, EventRepository],
})
export class RepositoriesModule {}
