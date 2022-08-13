import 'dotenv/config';
import { SequelizeOptions } from 'sequelize-typescript';

export const db_test_config: SequelizeOptions = {
    dialect: 'postgres',
    host: "categories-test-db",
    username: "postgres",
    password: "password123",
    database: "meetup-categories",
    port: 5432,
    define: {
      timestamps: true,
    },
    logging: false
}