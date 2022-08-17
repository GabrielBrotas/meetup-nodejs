import { Provider } from '@nestjs/common';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { CategoryModel } from '@gbrotas/categories-core/infra';
// import { databaseConfig } from './database.config';

export const databaseProviders: Provider<any>[] = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const config: SequelizeOptions = {
        dialect: 'postgres',
        username: 'postgres',
        password: 'password123',
        database: 'postgres',
        host: 'categories-db',
        port: 5432,
      };
      // switch (process.env.NODE_ENV) {
      //   case DEVELOPMENT:
      //     config = databaseConfig.development;
      //     break;
      //   case TEST:
      //     config = databaseConfig.test;
      //     break;
      //   case PRODUCTION:
      //     config = databaseConfig.production;
      //     break;
      //   default:
      //     config = databaseConfig.development;
      // }
      const sequelize = new Sequelize(config);
      sequelize.addModels([CategoryModel]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
