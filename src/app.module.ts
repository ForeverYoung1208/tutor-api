import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MeetingsModule } from './modules/meetings/meetings.module';
import { RecordingsModule } from './modules/recordings/recordings.module';
import { ExceptionFiltersModule } from './exception-filters/exception-filters.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('databaseConfig')(),
    }),
    AuthModule,
    UsersModule,
    MeetingsModule,
    ExceptionFiltersModule,
    RecordingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
