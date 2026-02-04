import { databaseConfig } from './db/database.config';

export const envFilePath = (): string => '.env';

export default () => ({
  databaseConfig,
});
