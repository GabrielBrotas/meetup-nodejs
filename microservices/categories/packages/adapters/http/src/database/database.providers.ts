import { Provider } from '@nestjs/common';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { CategoryModel } from '@gbrotas/categories-core/infra';
import { databaseConfig } from './database.config';

export const databaseProviders: Provider<any>[] = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      console.log(databaseConfig);
      const sequelize = new Sequelize(databaseConfig as SequelizeOptions);
      sequelize.addModels([CategoryModel]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
