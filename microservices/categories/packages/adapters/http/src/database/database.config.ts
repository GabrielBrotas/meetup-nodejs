import 'dotenv/config';

import { IDatabaseConfig } from './interfaces/db-config.interface';

export const databaseConfig: IDatabaseConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: process.env.DB_DIALECT,
};
