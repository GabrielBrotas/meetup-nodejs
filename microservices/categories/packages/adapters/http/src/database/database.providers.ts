import { Provider } from '@nestjs/common';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { CategoryModel } from '@gbrotas/categories-core/infra';
import { databaseConfig } from './database.config';

const reconnectOptions = {
  max_retries: 10,
  onRetry: function (count) {
    console.log('connection lost, trying to reconnect (' + count + ')');
  },
};

export const databaseProviders: Provider<any>[] = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        ...(databaseConfig as SequelizeOptions),
        retry: {
          max: Infinity,
          match: [
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/,
          ],
        },
      });
      sequelize.addModels([CategoryModel]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
