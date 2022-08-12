import 'dotenv/config';
import { SequelizeOptions } from 'sequelize-typescript';

export const db_test_config: SequelizeOptions = {
    dialect: 'postgres',
    host: "meetings-test-db",
    username: "postgres",
    password: "password123",
    database: "meetup-meetings",
    port: 5432,
    define: {
      timestamps: true,
    },
    logging: false
}