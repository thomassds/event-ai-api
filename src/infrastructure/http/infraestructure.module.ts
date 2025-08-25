import { Module } from '@nestjs/common';
import { ApplicationModule } from '../../application/application.module';
import { UserController } from './controllers/user.controller';
import { EventController } from './controllers/event.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [UserController, EventController],
})
export class InfrastructureModule {}
