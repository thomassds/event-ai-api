import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './infrastructure/config/config.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/http/infraestructure.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ApplicationModule,
    InfrastructureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
