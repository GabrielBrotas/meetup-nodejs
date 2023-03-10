import 'dotenv/config';
import { SequelizeOptions } from 'sequelize-typescript';

export const db_config: SequelizeOptions = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 5432,
    define: {
      timestamps: true,
    },
    logging: false
}