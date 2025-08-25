import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../infrastructure/database/repositories/repositories.module';
import { CreateUserService } from './services';
import { CreateUserUseCase } from './useCases';

@Module({
  imports: [RepositoriesModule],
  providers: [CreateUserUseCase, CreateUserService],
  exports: [CreateUserUseCase, CreateUserService],
})
export class ApplicationModule {}
