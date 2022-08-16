import { Module } from '@nestjs/common';

type DB_SCHEMA_TYPE = {
  DB_VENDOR: 'mysql' | 'sqlite';
  DB_HOST: string;
  DB_DATABASE: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_LOGGING: boolean;
  DB_AUTO_LOAD_MODELS: boolean;
};

@Module({})
export class ConfigModule {}
