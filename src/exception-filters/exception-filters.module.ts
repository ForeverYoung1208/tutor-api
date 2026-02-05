import { Module } from '@nestjs/common';
import { EXCEPTION_FILTER_CONFIG_TOKEN } from './constants';
import { ConfigService } from '@nestjs/config';
import { IExceptionFiltersConfig } from './types';
import { APP_FILTER } from '@nestjs/core';
import { UnhandledExceptionsFilter } from './filters/unhandled-exceptions.filter';
import { ENV_DEV, ENV_LOCAL, ENV_TEST } from '../constants/system';

@Module({
  providers: [
    {
      provide: EXCEPTION_FILTER_CONFIG_TOKEN,
      inject: [ConfigService],
      useFactory: (config: ConfigService): IExceptionFiltersConfig => {
        const currentEnv = config.get('NODE_ENV');
        return {
          doAttachStack: [ENV_DEV, ENV_LOCAL, ENV_TEST].includes(currentEnv),
          doLogCommonErrors: [ENV_DEV, ENV_LOCAL, ENV_TEST].includes(currentEnv),
        };
      },
    },

    // The order of filters is important! More specific filters should be after less specific (more general) ones.
    // i.e. filters in the top of the list will be tested last.
    // UnhandledExceptionsFilter is the most general one, it should be the first one to catch only errors that are not caught by more specific filters.
    {
      provide: APP_FILTER,
      useClass: UnhandledExceptionsFilter,
    },
  ],
})
export class ExceptionFiltersModule {}
